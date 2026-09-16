import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { classifyFeedback } from "@/lib/ai/classification";
import { storeFeedbackEmbedding } from "@/lib/ai/ai-engine";
import { Role } from "@prisma/client";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const allowedRoles: Role[] = [Role.ADMIN, Role.ANALYST];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ success: false, message: "You do not have permission to re-classify feedback." }, { status: 403 });
    }
    const feedback = await prisma.feedback.findFirst({
      where: {
        id: params.id,
        workspaceId: user.workspaceId,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { success: false, message: "Feedback not found." },
        { status: 404 },
      );
    }

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

      for (const themeData of classification.themes) {
        const themeName = themeData.name.trim();

        let theme = await tx.theme.findFirst({
          where: {
            workspaceId: user.workspaceId,
            name: {
              equals: themeName,
              mode: "insensitive",
            },
          },
        });

        if (!theme) {
          theme = await tx.theme.create({
            data: {
              name: themeName,
              description: `AI-generated theme: ${themeName}`,
              workspaceId: user.workspaceId,
            },
          });
        }

        await tx.feedbackTheme.upsert({
          where: {
            feedbackId_themeId: {
              feedbackId: feedback.id,
              themeId: theme.id,
            },
          },
          update: {
            confidence: themeData.confidence,
          },
          create: {
            feedbackId: feedback.id,
            themeId: theme.id,
            confidence: themeData.confidence,
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
    });

    await storeFeedbackEmbedding(
      feedback.id,
      feedback.content,
      classification.featureArea,
    );

    return NextResponse.json({
      success: true,
      message: "Feedback re-classified successfully.",
      feedback: updatedFeedback,
      ai: {
        classified: true,
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore,
        featureArea: classification.featureArea,
        themes: classification.themes,
      },
    });
  } catch (error) {
    console.error("Feedback re-classification error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to re-classify feedback.",
      },
      { status: 500 },
    );
  }
}
