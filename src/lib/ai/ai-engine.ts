import { GoogleGenAI, Type } from "@google/genai";
import type { FeatureExtractionPipeline } from "@xenova/transformers";
import { Sentiment } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
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

  try {
    const response = await gemini.models.generateContent({
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
    console.error("Ask LOOP Gemini error:", error);
    throw error;
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

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const contextText = feedbacks
    .map(
      (feedback) =>
        `[Channel: ${feedback.channel}]
Sentiment: ${feedback.sentiment ?? "Unclassified"}
Feature Area: ${feedback.featureArea ?? "Unclassified"}
Content: ${feedback.content}`,
    )
    .join("\n\n");

  const response = await gemini.models.generateContent({
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
    throw new Error("Gemini returned empty trend JSON");
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Gemini returned invalid trend JSON");
  }

  const parsed: unknown = JSON.parse(text.slice(start, end + 1));

  return trendSchema.parse(parsed);
};