import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const workspaces = await prisma.workspace.findMany();

    return NextResponse.json({
      success: true,
      count: workspaces.length,
      data: workspaces,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}