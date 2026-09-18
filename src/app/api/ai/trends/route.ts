import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { analyzeEmergingTrend } from "@/lib/ai/ai-engine";

export const dynamic = "force-dynamic";

export async function GET() {
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

    const feedbacks = await prisma.feedback.findMany({
      where: {
        workspaceId: user.workspaceId,
      },
      select: {
        content: true,
        channel: true,
        sentiment: true,
        featureArea: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 40,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        success: true,
        trend: null,
        message: "No feedback available for trend analysis.",
      });
    }

    const trend = await analyzeEmergingTrend(feedbacks);

    return NextResponse.json({
      success: true,
      trend,
    });
  } catch (error) {
    console.error("AI trends API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to analyze emerging trends.",
      },
      { status: 500 },
    );
  }
}
