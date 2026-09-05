import { z } from "zod";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";

const filterSchema = z.object({
  startDate: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid start date",
    })
    .optional(),

  endDate: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid end date",
    })
    .optional(),

  channel: z.string().optional(),

  sentiment: z.enum(["POS", "NEU", "NEG"]).optional(),

  status: z.enum(["NEW", "REVIEWED", "ACTIONED"]).optional(),
});

export async function GET(request: Request) {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const filters = filterSchema.safeParse({
      startDate: searchParams.get("startDate") ?? undefined,
      endDate: searchParams.get("endDate") ?? undefined,
      channel: searchParams.get("channel") ?? undefined,
      sentiment: searchParams.get("sentiment") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    });

    if (!filters.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid filter values",
          errors: filters.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      startDate,
      endDate,
      channel,
      sentiment,
      status,
    } = filters.data;

    const where: any = {
      workspaceId: user.workspaceId,
    };

    if (channel) {
      where.channel = channel;
    }

    if (sentiment) {
      where.sentiment = sentiment;
    }

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) {
        const start = new Date(startDate);

        if (startDate.length === 10) {
          start.setHours(0, 0, 0, 0);
        }

        where.createdAt.gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);

        if (endDate.length === 10) {
          end.setHours(23, 59, 59, 999);
        }

        where.createdAt.lte = end;
      }
    }

    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        themes: {
          include: {
            theme: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const totalFeedback = feedbacks.length;

    const negativeFeedback = feedbacks.filter(
      (feedback) => feedback.sentiment === "NEG"
    ).length;

    const negativePercentage =
      totalFeedback > 0
        ? Number(((negativeFeedback / totalFeedback) * 100).toFixed(1))
        : 0;

    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const newThisWeek = feedbacks.filter(
      (feedback) => feedback.createdAt >= startOfWeek
    ).length;

    const sentimentBreakdown = {
      POS: feedbacks.filter(
        (feedback) => feedback.sentiment === "POS"
      ).length,

      NEU: feedbacks.filter(
        (feedback) => feedback.sentiment === "NEU"
      ).length,

      NEG: negativeFeedback,
    };

    const volumeMap: Record<string, number> = {};

    feedbacks.forEach((feedback) => {
      const date = feedback.createdAt.toISOString().split("T")[0];

      volumeMap[date] = (volumeMap[date] || 0) + 1;
    });

    const volumeOverTime = Object.entries(volumeMap).map(
      ([date, count]) => ({
        date,
        count,
      })
    );

    const themeMap: Record<string, number> = {};

    feedbacks.forEach((feedback) => {
      feedback.themes.forEach((feedbackTheme) => {
        const themeName = feedbackTheme.theme.name;

        themeMap[themeName] = (themeMap[themeName] || 0) + 1;
      });
    });

    const topThemes = Object.entries(themeMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      filters: {
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        channel: channel ?? null,
        sentiment: sentiment ?? null,
        status: status ?? null,
      },
      analytics: {
        totalFeedback,
        negativePercentage,
        newThisWeek,
        sentimentBreakdown,
        volumeOverTime,
        topThemes,
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}