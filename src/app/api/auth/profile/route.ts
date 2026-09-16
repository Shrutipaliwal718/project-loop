import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/require-auth";

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

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const profileImage =
      typeof body.profileImage === "string" ? body.profileImage : null;

    if (profileImage !== null) {
      if (!profileImage.startsWith("data:image/")) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid profile image format.",
          },
          { status: 400 },
        );
      }

      if (profileImage.length > 3000000) {
        return NextResponse.json(
          {
            success: false,
            message: "Profile image is too large.",
          },
          { status: 400 },
        );
      }
    }
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 },
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must contain at least 2 characters.",
        },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name cannot exceed 100 characters.",
        },
        { status: 400 },
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already in use.",
        },
        { status: 409 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
        ...(profileImage !== null ? { profileImage } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        workspaceId: true,
        profileImage: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating your profile.",
      },
      { status: 500 },
    );
  }
}

