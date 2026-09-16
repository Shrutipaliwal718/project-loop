import { z } from "zod";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  periodStart: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid period start",
    })
    .optional(),

  periodEnd: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid period end",
    })
    .optional(),
});

const reportSchema = z.object({
  executiveSummary: z.string().min(1),
  topThemes: z
    .array(
      z.object({
        name: z.string().min(1),
        count: z.number().int().nonnegative(),
        percentage: z.number().nonnegative(),
        insight: z.string().min(1),
      }),
    )
    .max(10),
  sentimentShifts: z
    .array(
      z.object({
        sentiment: z.enum(["POS", "NEU", "NEG"]),
        observation: z.string().min(1),
      }),
    )
    .max(5),
  notableQuotes: z
    .array(
      z.object({
        feedbackId: z.string().min(1),
        quote: z.string().min(1),
        reason: z.string().min(1),
      }),
    )
    .max(10),
  recommendedActions: z
    .array(
      z.object({
        action: z.string().min(1),
        reason: z.string().min(1),
      }),
    )
    .max(10),
});

const extractJson = (text: string): string => {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Claude returned invalid report JSON");
  }

  return cleaned.slice(start, end + 1);
};

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));

    const parsedRequest = requestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid report period",
          errors: parsedRequest.error.flatten(),
        },
        { status: 400 },
      );
    }

    const now = new Date();

    const periodEnd = parsedRequest.data.periodEnd
      ? new Date(parsedRequest.data.periodEnd)
      : now;

    const periodStart = parsedRequest.data.periodStart
      ? new Date(parsedRequest.data.periodStart)
      : new Date(periodEnd.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (periodStart > periodEnd) {
      return NextResponse.json(
        {
          success: false,
          message: "Period start cannot be after period end",
        },
        { status: 400 },
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        workspaceId: user.workspaceId,
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      },
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 200,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No feedback found for the selected period.",
        },
        { status: 404 },
      );
    }

    const contextText = feedbacks
      .map(
        (feedback) =>
          `[Feedback ID: ${feedback.id}]
Date: ${feedback.createdAt.toISOString()}
Channel: ${feedback.channel}
Customer: ${feedback.customerLabel ?? "Unknown"}
Sentiment: ${feedback.sentiment ?? "Unclassified"}
Sentiment Score: ${feedback.sentimentScore ?? "Unclassified"}
Feature Area: ${feedback.featureArea ?? "Unclassified"}
Themes: ${
            feedback.themes.length > 0
              ? feedback.themes
                  .map((item) => item.theme.name)
                  .join(", ")
              : "Unclassified"
          }
Content: ${feedback.content}`,
      )
      .join("\n\n");

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1600,
      temperature: 0,
      system: `You are LOOP's Voice-of-Customer report generator.

Analyze ONLY the supplied customer feedback.

Return ONLY valid JSON using exactly this structure:

{
  "executiveSummary": "concise executive summary",
  "topThemes": [
    {
      "name": "theme name",
      "count": 0,
      "percentage": 0,
      "insight": "what the feedback indicates"
    }
  ],
  "sentimentShifts": [
    {
      "sentiment": "POS | NEU | NEG",
      "observation": "supported observation"
    }
  ],
  "notableQuotes": [
    {
      "feedbackId": "actual Feedback ID",
      "quote": "short verbatim quote from supplied feedback",
      "reason": "why this quote is notable"
    }
  ],
  "recommendedActions": [
    {
      "action": "recommended action",
      "reason": "evidence-based reason"
    }
  ]
}

Rules:
1. Never invent feedback, statistics, customers, quotes, themes, or facts.
2. Every notable quote MUST come directly from the supplied feedback.
3. Every feedback ID MUST exist in the supplied context.
4. Use POS, NEU, or NEG exactly for sentiment.
5. Keep recommendations grounded in the supplied evidence.
6. If there is insufficient evidence for a claim, do not make that claim.
7. Return JSON only. No markdown or explanation outside JSON.`,

      messages: [
        {
          role: "user",
          content: `Reporting period:
${periodStart.toISOString()} to ${periodEnd.toISOString()}

Customer feedback:

${contextText}`,
        },
      ],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    if (!text) {
      throw new Error("Claude returned an empty report");
    }

    const reportData = reportSchema.parse(JSON.parse(extractJson(text)));

    const savedReport = await prisma.report.create({
      data: {
        title: "Voice-of-Customer Report",
        periodStart,
        periodEnd,
        contentJson: reportData,
        workspaceId: user.workspaceId,
        generatedById: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        report: {
          id: savedReport.id,
          title: savedReport.title,
          periodStart: savedReport.periodStart,
          periodEnd: savedReport.periodEnd,
          createdAt: savedReport.createdAt,
          content: reportData,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("VoC report generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate Voice-of-Customer report.",
      },
      { status: 500 },
    );
  }
}
