import { GoogleGenAI, Type } from "@google/genai";
import { Sentiment } from "@prisma/client";
import { z } from "zod";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const classificationSchema = z.object({
  sentiment: z.enum(["POS", "NEU", "NEG"]),
  sentimentScore: z.number().min(-1).max(1),
  featureArea: z.string().min(1).max(100),
  themes: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        confidence: z.number().min(0).max(1),
      })
    )
    .min(1)
    .max(5),
});

export type ClassificationResult = {
  sentiment: Sentiment;
  sentimentScore: number;
  featureArea: string;
  themes: {
    name: string;
    confidence: number;
  }[];
};

const extractJson = (text: string): string => {
  const cleaned = text.trim();

  const withoutFence = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Gemini did not return valid JSON");
  }

  return withoutFence.slice(start, end + 1);
};

export const classifyFeedback = async (
  content: string
): Promise<ClassificationResult> => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error("Feedback content cannot be empty");
  }

  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `Classify the following customer feedback:

${trimmedContent}`,
    config: {
      temperature: 0,

      systemInstruction: `You are the AI classification engine for LOOP, a customer feedback intelligence platform.

Your job is to analyze customer feedback and classify it accurately.

Return ONLY valid JSON.

Required JSON structure:

{
  "sentiment": "POS | NEU | NEG",
  "sentimentScore": number,
  "featureArea": "short feature/product area",
  "themes": [
    {
      "name": "short theme name",
      "confidence": number
    }
  ]
}

Rules:

1. sentiment must be exactly one of:
   - POS
   - NEU
   - NEG

2. sentimentScore must be between -1 and 1.
   - strongly negative feedback should be closer to -1
   - neutral feedback should be around 0
   - strongly positive feedback should be closer to 1

3. featureArea must be a short product/business area.
   Examples:
   - Billing
   - UX/UI
   - Navigation
   - Performance
   - Bug
   - Feature Request
   - Customer Support
   - Authentication
   - Payments
   - Search
   - Notifications

4. Return between 1 and 5 relevant themes.

5. Theme names must be concise and meaningful.

6. Theme confidence must be between 0 and 1.

7. Do not invent information that is not present in the feedback.

8. Do not return markdown.

9. Do not return explanations.

10. Do not return any fields other than the required fields.`,

      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: {
            type: Type.STRING,
            enum: ["POS", "NEU", "NEG"],
          },
          sentimentScore: {
            type: Type.NUMBER,
          },
          featureArea: {
            type: Type.STRING,
          },
          themes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                },
                confidence: {
                  type: Type.NUMBER,
                },
              },
              required: ["name", "confidence"],
            },
          },
        },
        required: [
          "sentiment",
          "sentimentScore",
          "featureArea",
          "themes",
        ],
      },
    },
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  const rawJson = extractJson(text);
  const parsedJson: unknown = JSON.parse(rawJson);

  const validated = classificationSchema.parse(parsedJson);

  return {
    sentiment: validated.sentiment,
    sentimentScore: validated.sentimentScore,
    featureArea: validated.featureArea,
    themes: validated.themes,
  };
};