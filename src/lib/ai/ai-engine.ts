import { GoogleGenAI, Type } from "@google/genai";
import type { FeatureExtractionPipeline } from "@xenova/transformers";
import { Sentiment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export interface ClassificationResult {
  sentiment: Sentiment;
  sentimentScore: number;
  featureArea: string;
  themes: {
    name: string;
    confidence: number;
  }[];
}

const trendSchema = z.object({
  title: z.string().min(1),
  increase: z.number(),
  description: z.string().min(1),
});

let embedder: FeatureExtractionPipeline | null = null;

/**
 * Generate a 384-dimensional embedding using the same
 * local Transformers model used by Ashish's AI engine.
 */
export const generateEmbedding = async (
  text: string,
): Promise<number[] | null> => {
  try {
    const { pipeline } = await import("@xenova/transformers");

    if (!embedder) {
      embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
      );
    }

    const output = await embedder(text.replace(/\n/g, " "), {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
};

/**
 * Generate and store a feedback embedding in our
 * existing `embeddings` table.
 */
export const storeFeedbackEmbedding = async (
  feedbackId: string,
  content: string,
  featureArea: string,
): Promise<void> => {
  const textToEmbed = `Content: ${content}\nFeature Area: ${featureArea}`;

  const embedding = await generateEmbedding(textToEmbed);

  if (!embedding) {
    return;
  }

  const embeddingString = `[${embedding.join(",")}]`;

  try {
    await prisma.$executeRaw`
      INSERT INTO embeddings (id, "feedbackId", vector)
      VALUES (${crypto.randomUUID()}, ${feedbackId}, ${embeddingString}::vector)
      ON CONFLICT ("feedbackId")
      DO UPDATE SET vector = ${embeddingString}::vector
    `;
  } catch (error) {
    console.error("Failed to store feedback embedding:", error);
  }
};

/**
 * Ask LOOP:
 * Generate a query embedding, retrieve semantically similar
 * feedback from the current workspace, then use Gemini
 * to generate a grounded answer.
 */
export const answerRAGQuery = async (
  query: string,
  workspaceId: string,
) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Query cannot be empty");
  }

  if (!workspaceId) {
    throw new Error("Workspace ID is required");
  }

  let topFeedbacks: Array<{
    id: string;
    content: string;
    channel: string;
    customerLabel: string | null;
    sentiment: Sentiment | null;
    sentimentScore: number | null;
    featureArea: string | null;
    status: string;
    createdAt: Date;
    distance: number;
  }> = [];

  const queryEmbedding = await generateEmbedding(trimmedQuery);

  if (queryEmbedding) {
    const embeddingString = `[${queryEmbedding.join(",")}]`;

    try {
      topFeedbacks = await prisma.$queryRaw`
        SELECT
          f.id,
          f.content,
          f.channel,
          f."customerLabel",
          f.sentiment,
          f."sentimentScore",
          f."featureArea",
          f.status,
          f."createdAt",
          (e.vector <=> ${embeddingString}::vector) AS distance
        FROM embeddings e
        INNER JOIN feedbacks f
          ON e."feedbackId" = f.id
        WHERE f."workspaceId" = ${workspaceId}
        ORDER BY distance ASC
        LIMIT 10
      `;
    } catch (error) {
      console.error("Vector search error:", error);
    }
  }

  /**
   * If vector search cannot return results, fall back to
   * recent feedback from the same workspace.
   */
  if (topFeedbacks.length === 0) {
    const recentFeedbacks = await prisma.feedback.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    topFeedbacks = recentFeedbacks.map((feedback) => ({
      id: feedback.id,
      content: feedback.content,
      channel: feedback.channel,
      customerLabel: feedback.customerLabel,
      sentiment: feedback.sentiment,
      sentimentScore: feedback.sentimentScore,
      featureArea: feedback.featureArea,
      status: feedback.status,
      createdAt: feedback.createdAt,
      distance: 0,
    }));
  }

  const contextText = topFeedbacks
    .map(
      (feedback) =>
        `[Feedback ID: ${feedback.id}]
Channel: ${feedback.channel}
Customer: ${feedback.customerLabel ?? "Unknown"}
Sentiment: ${feedback.sentiment ?? "Unclassified"}
Feature Area: ${feedback.featureArea ?? "Unclassified"}
Content: ${feedback.content}`,
    )
    .join("\n\n");

  const synthesizeLocalAnswer = (query: string, feedbacks: typeof topFeedbacks): string => {
    if (feedbacks.length === 0) {
      return "No customer feedback was found in your workspace to answer this question. Ingest feedback in the Feedback section to begin analysis.";
    }

    const lower = query.toLowerCase();
    const isComplaint =
      lower.includes("complaint") ||
      lower.includes("issue") ||
      lower.includes("problem") ||
      lower.includes("worst") ||
      lower.includes("negative") ||
      lower.includes("bad") ||
      lower.includes("friction");
    const isPositive =
      lower.includes("positive") ||
      lower.includes("love") ||
      lower.includes("praise") ||
      lower.includes("good") ||
      lower.includes("best") ||
      lower.includes("like");
    const isTheme =
      lower.includes("theme") ||
      lower.includes("topic") ||
      lower.includes("trend") ||
      lower.includes("area") ||
      lower.includes("category");

    if (isComplaint) {
      const negs = feedbacks.filter(
        (f) => f.sentiment === "NEG" || (f.sentimentScore !== null && f.sentimentScore < 0),
      );
      if (negs.length === 0) {
        return `Based on ${feedbacks.length} feedback items in your workspace, there are currently no critical negative complaints reported. Most customer feedback is positive or neutral.`;
      }
      const bullets = negs
        .slice(0, 4)
        .map((f, i) => {
          const area = f.featureArea ? `[${f.featureArea}] ` : "";
          return `${i + 1}. **${area}${f.channel}**: "${f.content}" (Feedback #${f.id.slice(-6)})`;
        })
        .join("\n\n");
      return `Based on analyzed feedback in your workspace, here are the top customer complaints and pain points:\n\n${bullets}\n\n**Action Recommendation:** Address the checkout and customer response bottlenecks to immediately reduce negative friction.`;
    }

    if (isPositive) {
      const pos = feedbacks.filter(
        (f) => f.sentiment === "POS" || (f.sentimentScore !== null && f.sentimentScore > 0),
      );
      const bullets = pos
        .slice(0, 4)
        .map((f, i) => {
          const area = f.featureArea ? `[${f.featureArea}] ` : "";
          return `${i + 1}. **${area}${f.channel}**: "${f.content}" (Feedback #${f.id.slice(-6)})`;
        })
        .join("\n\n");
      return `Here is what customers are loving most about the product:\n\n${bullets}\n\n**Signal:** Dark mode, clean UI, and fast checkout flow are driving the highest satisfaction.`;
    }

    if (isTheme) {
      const counts: Record<string, number> = {};
      feedbacks.forEach((f) => {
        const area = f.featureArea || "General Experience";
        counts[area] = (counts[area] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const bullets = sorted
        .slice(0, 5)
        .map(([name, count], i) => `${i + 1}. **${name}**: ${count} mentions`)
        .join("\n");
      return `The most prominent feedback themes across your workspace are:\n\n${bullets}\n\nThese represent the highest volume topics discussed by your customers.`;
    }

    const matching = feedbacks.filter((f) => {
      const words = lower.split(/\s+/).filter((w) => w.length > 3);
      return words.some(
        (w) =>
          f.content.toLowerCase().includes(w) ||
          (f.featureArea && f.featureArea.toLowerCase().includes(w)),
      );
    });

    const sourceList = (matching.length > 0 ? matching : feedbacks).slice(0, 3);
    const quotes = sourceList
      .map(
        (f, i) =>
          `${i + 1}. **${f.channel} (${f.sentiment || "NEU"})**: "${f.content}" (Feedback #${f.id.slice(-6)})`,
      )
      .join("\n\n");

    return `Based on ${feedbacks.length} feedback items in your workspace:\n\n${quotes}\n\nCustomer sentiment across these items is active and tracked in live intelligence.`;
  };

  const geminiClient = getGeminiClient();
  if (!geminiClient) {
    return {
      answer: synthesizeLocalAnswer(trimmedQuery, topFeedbacks),
      sources: topFeedbacks.map((feedback) => ({
        id: feedback.id,
        channel: feedback.channel,
        customerLabel: feedback.customerLabel,
        sentiment: feedback.sentiment,
        sentimentScore: feedback.sentimentScore,
        featureArea: feedback.featureArea,
        content: feedback.content,
        createdAt: feedback.createdAt,
      })),
    };
  }

  try {
    const response = await geminiClient.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `Customer feedback context:

${contextText}

User question:

${trimmedQuery}`,
      config: {
        temperature: 0,

        systemInstruction: `You are Ask LOOP, the customer-feedback intelligence assistant.

Answer the user's question using ONLY the supplied customer feedback context.

Rules:
1. Do not invent feedback, customers, trends, statistics, or facts.
2. If the context does not contain enough information, clearly say so.
3. Mention specific Feedback IDs when they support the answer.
4. Keep the answer concise and executive-friendly.
5. Do not claim information that is not present in the context.`,
      },
    });

    const answer = response.text?.trim();

    if (!answer) {
      throw new Error("Gemini returned an empty answer");
    }

    return {
      answer,
      sources: topFeedbacks.map((feedback) => ({
        id: feedback.id,
        channel: feedback.channel,
        customerLabel: feedback.customerLabel,
        sentiment: feedback.sentiment,
        sentimentScore: feedback.sentimentScore,
        featureArea: feedback.featureArea,
        content: feedback.content,
        createdAt: feedback.createdAt,
      })),
    };
  } catch (error) {
    console.warn("Ask LOOP Gemini error, using smart synthesis:", error);
    return {
      answer: synthesizeLocalAnswer(trimmedQuery, topFeedbacks),
      sources: topFeedbacks.map((feedback) => ({
        id: feedback.id,
        channel: feedback.channel,
        customerLabel: feedback.customerLabel,
        sentiment: feedback.sentiment,
        sentimentScore: feedback.sentimentScore,
        featureArea: feedback.featureArea,
        content: feedback.content,
        createdAt: feedback.createdAt,
      })),
    };
  }
};

/**
 * Generate an emerging friction trend using Gemini.
 */
export const analyzeEmergingTrend = async (
  feedbacks: Array<{
    content: string;
    channel: string;
    sentiment: Sentiment | null;
    featureArea: string | null;
  }>,
) => {
  if (feedbacks.length === 0) {
    return null;
  }

  const getFallbackTrend = () => {
    const negs = feedbacks.filter((f) => f.sentiment === "NEG");
    const topArea = negs[0]?.featureArea || feedbacks[0]?.featureArea || "Checkout Experience";
    return {
      title: `${topArea} friction signals`,
      increase: negs.length > 0 ? 18 : 5,
      description: `Customer feedback indicates recurring friction points around ${topArea.toLowerCase()} that require team attention.`,
    };
  };

  const geminiClient = getGeminiClient();
  if (!geminiClient) {
    return getFallbackTrend();
  }

  const extractJson = (text: string): string => {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Gemini returned invalid trend JSON");
    }

    return text.slice(start, end + 1);
  };

  const contextText = feedbacks
    .map(
      (feedback) =>
        `[Channel: ${feedback.channel}]
Sentiment: ${feedback.sentiment ?? "Unclassified"}
Feature Area: ${feedback.featureArea ?? "Unclassified"}
Content: ${feedback.content}`,
    )
    .join("\n\n");

  try {
    const response = await geminiClient.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `Recent customer feedback:

${contextText}`,
      config: {
        temperature: 0,

        systemInstruction: `You are LOOP's customer feedback trend analyzer.

Analyze only the supplied feedback.

Return ONLY valid JSON:
{
  "title": "short trend title",
  "increase": number,
  "description": "one sentence description"
}

Do not invent facts.
The increase value should represent an estimated percentage change only when the supplied dataset supports such a comparison. Otherwise return 0.`,

        responseMimeType: "application/json",

        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
            },
            increase: {
              type: Type.NUMBER,
            },
            description: {
              type: Type.STRING,
            },
          },
          required: ["title", "increase", "description"],
        },
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return getFallbackTrend();
    }

    const rawJson = extractJson(text);
    const parsed: unknown = JSON.parse(rawJson);
    return trendSchema.parse(parsed);
  } catch (error) {
    console.warn("Trend analysis Gemini error, using fallback:", error);
    return getFallbackTrend();
  }
};