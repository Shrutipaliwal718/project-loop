import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function GET() {
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

    const feedbacks = await prisma.feedback.findMany({
      where: {
        workspaceId: user.workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error("Get feedback error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const allowedRoles = [Role.ADMIN, Role.ANALYST];

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
        content,
        channel,
        sourceRef: sourceRef || null,
        customerLabel: customerLabel || null,
        workspaceId: user.workspaceId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback created successfully",
        feedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create feedback error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}