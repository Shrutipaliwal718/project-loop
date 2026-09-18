import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { classifyFeedback } from "@/lib/ai/classification";
import { storeFeedbackEmbedding } from "@/lib/ai/ai-engine";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { workspaceId: user.workspaceId },
      orderBy: { createdAt: "desc" },
      include: {
        themes: {
          include: { theme: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error("Get feedback error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const allowedRoles: Role[] = [Role.ADMIN, Role.ANALYST];

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to create feedback",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { content, channel, sourceRef, customerLabel } = body;

    if (!content || !channel) {
      return NextResponse.json(
        {
          success: false,
          message: "Content and channel are required",
        },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        content: content.trim(),
        channel: channel.trim(),
        sourceRef: sourceRef || null,
        customerLabel: customerLabel || null,
        workspaceId: user.workspaceId,
      },
    });

    try {
      const classification = await classifyFeedback(feedback.content);

      const updatedFeedback = await prisma.$transaction(async (tx) => {
        await tx.feedback.update({
          where: { id: feedback.id },
          data: {
            sentiment: classification.sentiment,
            sentimentScore: classification.sentimentScore,
            featureArea: classification.featureArea,
          },
        });

        for (const classifiedTheme of classification.themes) {
          const existingTheme = await tx.theme.findFirst({
            where: {
              workspaceId: user.workspaceId,
              name: classifiedTheme.name,
            },
          });

          const theme = existingTheme
            ? existingTheme
            : await tx.theme.create({
                data: {
                  name: classifiedTheme.name,
                  workspaceId: user.workspaceId,
                },
              });

          await tx.feedbackTheme.upsert({
            where: {
              feedbackId_themeId: {
                feedbackId: feedback.id,
                themeId: theme.id,
              },
            },
            update: {
              confidence: classifiedTheme.confidence,
            },
            create: {
              feedbackId: feedback.id,
              themeId: theme.id,
              confidence: classifiedTheme.confidence,
            },
          });
        }

        return tx.feedback.findUnique({
          where: { id: feedback.id },
          include: {
            themes: {
              include: { theme: true },
            },
          },
        });
      }, { timeout: 15000 });

      try {
        await storeFeedbackEmbedding(
          feedback.id,
          feedback.content,
          classification.featureArea
        );
      } catch (embeddingError) {
        console.error("Feedback embedding error:", embeddingError);
      }

      return NextResponse.json(
        {
          success: true,
          message: "Feedback created and classified successfully",
          feedback: updatedFeedback,
          ai: {
            classified: true,
            featureArea: classification.featureArea,
            themes: classification.themes,
          },
        },
        { status: 201 }
      );
    } catch (aiError) {
      console.error("AI classification error:", aiError);

      return NextResponse.json(
        {
          success: true,
          message: "Feedback created, but AI classification failed",
          feedback,
          ai: { classified: false },
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Create feedback error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

