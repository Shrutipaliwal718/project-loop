import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/require-auth";
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
        { status: 401 },
      );
    }

    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Only workspace admins can view members.",
        },
        { status: 403 },
      );
    }

    const members = await prisma.user.findMany({
      where: {
        workspaceId: user.workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const counts = {
      total: members.length,
      admins: members.filter((member) => member.role === Role.ADMIN).length,
      analysts: members.filter((member) => member.role === Role.ANALYST).length,
      viewers: members.filter((member) => member.role === Role.VIEWER).length,
    };

    return NextResponse.json({
      success: true,
      members,
      counts,
    });
  } catch (error) {
    console.error("Members fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load workspace members.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
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

    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Only workspace admins can change member roles.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    const memberId = body?.memberId;
    const newRole = body?.role;

    if (!memberId || typeof memberId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Member ID is required.",
        },
        { status: 400 },
      );
    }

    if (newRole !== Role.ANALYST && newRole !== Role.VIEWER) {
      return NextResponse.json(
        {
          success: false,
          message: "Role can only be ANALYST or VIEWER.",
        },
        { status: 400 },
      );
    }

    if (memberId === user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot change your own admin role.",
        },
        { status: 400 },
      );
    }

    const member = await prisma.user.findFirst({
      where: {
        id: memberId,
        workspaceId: user.workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found in your workspace.",
        },
        { status: 404 },
      );
    }

    if (member.role === Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin roles cannot be changed here.",
        },
        { status: 400 },
      );
    }

    const updatedMember = await prisma.user.update({
      where: {
        id: member.id,
      },
      data: {
        role: newRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Member role updated successfully.",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Member role update error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update member role.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
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

    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Only workspace admins can remove members.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    const memberId = body?.memberId;

    if (!memberId || typeof memberId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Member ID is required.",
        },
        { status: 400 },
      );
    }

    if (memberId === user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot remove yourself from the workspace.",
        },
        { status: 400 },
      );
    }

    const member = await prisma.user.findFirst({
      where: {
        id: memberId,
        workspaceId: user.workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found in your workspace.",
        },
        { status: 404 },
      );
    }

    if (member.role === Role.ADMIN) {
      const adminCount = await prisma.user.count({
        where: {
          workspaceId: user.workspaceId,
          role: Role.ADMIN,
        },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          {
            success: false,
            message: "The last workspace admin cannot be removed.",
          },
          { status: 400 },
        );
      }
    }

    await prisma.user.delete({
      where: {
        id: member.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${member.name} was removed from the workspace.`,
    });
  } catch (error) {
    console.error("Member removal error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to remove member.",
      },
      { status: 500 },
    );
  }
}