import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/require-auth";
import { Role } from "@prisma/client";

const generateInviteCode = () => {
  const partOne = crypto.randomBytes(3).toString("hex").toUpperCase();
  const partTwo = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `LP-${partOne}-${partTwo}`;
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

    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        {
          success: false,
          message: "Only workspace admins can generate invites.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    const memberName =
      typeof body?.memberName === "string"
        ? body.memberName.trim()
        : "";

    const memberEmail =
      typeof body?.memberEmail === "string"
        ? body.memberEmail.trim().toLowerCase()
        : "";

    const requestedRole = body?.role;

    if (!memberName) {
      return NextResponse.json(
        {
          success: false,
          message: "Member name is required.",
        },
        { status: 400 },
      );
    }

    if (memberName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Member name must be 100 characters or fewer.",
        },
        { status: 400 },
      );
    }

    if (!memberEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Member email is required.",
        },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(memberEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid member email.",
        },
        { status: 400 },
      );
    }

    if (
      requestedRole !== Role.ANALYST &&
      requestedRole !== Role.VIEWER
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invite role must be ANALYST or VIEWER.",
        },
        { status: 400 },
      );
    }

    let code = "";
    let createdInvite = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      code = generateInviteCode();

      try {
        createdInvite = await prisma.workspaceInvite.create({
          data: {
            code,
            memberName,
            memberEmail,
            role: requestedRole,
            workspaceId: user.workspaceId,
          },
        });

        break;
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          continue;
        }

        throw error;
      }
    }

    if (!createdInvite) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to generate a unique invite code. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Invite generated successfully.",
        invite: {
          id: createdInvite.id,
          code: createdInvite.code,
          memberName: createdInvite.memberName,
          memberEmail: createdInvite.memberEmail,
          role: createdInvite.role,
          workspaceId: createdInvite.workspaceId,
          createdAt: createdInvite.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Invite generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to generate invite.",
      },
      { status: 500 },
    );
  }
}