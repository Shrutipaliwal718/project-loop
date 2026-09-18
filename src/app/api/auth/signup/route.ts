import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
      mode,
      workspaceName,
      inviteCode,
    } = body;

    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedWorkspaceName =
      typeof workspaceName === "string" ? workspaceName.trim() : "";
    const normalizedInviteCode =
      typeof inviteCode === "string"
        ? inviteCode.trim().toUpperCase()
        : "";

    if (!normalizedName || !normalizedEmail || !password || !mode) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, password and signup mode are required.",
        },
        { status: 400 },
      );
    }

    if (mode !== "CREATE" && mode !== "JOIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid signup mode.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (mode === "CREATE") {
      if (!normalizedWorkspaceName) {
        return NextResponse.json(
          {
            success: false,
            message: "Workspace name is required.",
          },
          { status: 400 },
        );
      }

      const existingWorkspace = await prisma.workspace.findUnique({
        where: {
          name: normalizedWorkspaceName,
        },
      });

      if (existingWorkspace) {
        return NextResponse.json(
          {
            success: false,
            message: "This workspace name is already in use.",
          },
          { status: 409 },
        );
      }

      const result = await prisma.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
          data: {
            name: normalizedWorkspaceName,
          },
        });

        const user = await tx.user.create({
          data: {
            name: normalizedName,
            email: normalizedEmail,
            passwordHash,
            role: Role.ADMIN,
            workspaceId: workspace.id,
          },
        });

        return { workspace, user };
      });

      return NextResponse.json(
        {
          success: true,
          message: "Workspace and account created successfully.",
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
            workspaceId: result.user.workspaceId,
          },
          workspace: {
            id: result.workspace.id,
            name: result.workspace.name,
          },
        },
        { status: 201 },
      );
    }

    if (!normalizedInviteCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Invite code is required.",
        },
        { status: 400 },
      );
    }

    const invite = await prisma.workspaceInvite.findUnique({
      where: {
        code: normalizedInviteCode,
      },
      include: {
        workspace: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid invite code.",
        },
        { status: 404 },
      );
    }

    if (invite.role === Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin invitations cannot be used for workspace joining.",
        },
        { status: 400 },
      );
    }

    if (!invite.memberEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "This invite is missing the required member email.",
        },
        { status: 400 },
      );
    }

    if (normalizedEmail !== invite.memberEmail.trim().toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          message: "This invite is assigned to a different email address.",
        },
        { status: 403 },
      );
    }

    if (
      invite.memberName &&
      normalizedName.toLowerCase() !== invite.memberName.trim().toLowerCase()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "The name does not match the name assigned to this invite.",
        },
        { status: 403 },
      );
    }

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        passwordHash,
        role: invite.role,
        workspaceId: invite.workspaceId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account joined the workspace successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          workspaceId: user.workspaceId,
        },
        workspace: {
          id: invite.workspace.id,
          name: invite.workspace.name,
        },
        invite: {
          role: invite.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "The email or workspace name is already in use.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong during signup.",
      },
      { status: 500 },
    );
  }
}
