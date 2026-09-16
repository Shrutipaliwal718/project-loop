import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { answerRAGQuery } from "@/lib/ai/ai-engine";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Please enter a question." },
        { status: 400 },
      );
    }

    if (query.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Question is too long." },
        { status: 400 },
      );
    }

    const result = await answerRAGQuery(query, user.workspaceId);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Ask LOOP API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Ask LOOP request failed.",
      },
      { status: 500 },
    );
  }
}
