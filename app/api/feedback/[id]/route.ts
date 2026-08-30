import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const allowedStatuses = ["NEW", "REVIEWED", "ACTIONED"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
          message: "You do not have permission to update feedback",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid feedback status",
        },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.findFirst({
      where: {
        id,
        workspaceId: user.workspaceId,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        {
          success: false,
          message: "Feedback not found",
        },
        { status: 404 }
      );
    }

    const updatedFeedback = await prisma.feedback.update({
      where: {
        id: feedback.id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    console.error("Update feedback error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Only ADMIN can delete feedback",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const feedback = await prisma.feedback.findFirst({
      where: {
        id,
        workspaceId: user.workspaceId,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        {
          success: false,
          message: "Feedback not found",
        },
        { status: 404 }
      );
    }

    await prisma.feedback.delete({
      where: {
        id: feedback.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete feedback error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}