import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { classifyFeedback } from "@/lib/ai/classification";
import { storeFeedbackEmbedding } from "@/lib/ai/ai-engine";

export const dynamic = "force-dynamic";

type CsvRow = {
  content?: string;
  channel?: string;
  customer_label?: string;
  created_at?: string;
};

const parseCsv = (text: string): CsvRow[] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i += 1;
      }

      row.push(value);
      value = "";

      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    value += char;
  }

  if (value || row.length > 0) {
    row.push(value);

    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) =>
    header.trim().toLowerCase().replace(/^\uFEFF/, ""),
  );

  return rows.slice(1).map((cells) => {
    const record: CsvRow = {};

    headers.forEach((header, index) => {
      const cell = cells[index]?.trim() ?? "";

      if (header === "content") record.content = cell;
      if (header === "channel") record.channel = cell;
      if (header === "customer_label") record.customer_label = cell;
      if (header === "created_at") record.created_at = cell;
    });

    return record;
  });
};

const processFeedbackWithAI = async (
  feedbackId: string,
  content: string,
) => {
  try {
    const classification = await classifyFeedback(content);

    const feedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: {
        sentiment: classification.sentiment,
        sentimentScore: classification.sentimentScore,
        featureArea: classification.featureArea,
      },
      select: {
        workspaceId: true,
      },
    });

    for (const themeData of classification.themes) {
      const normalizedThemeName = themeData.name.trim();

      let theme = await prisma.theme.findFirst({
        where: {
          workspaceId: feedback.workspaceId,
          name: {
            equals: normalizedThemeName,
            mode: "insensitive",
          },
        },
      });

      if (!theme) {
        theme = await prisma.theme.create({
          data: {
            name: normalizedThemeName,
            description: `AI-generated theme: ${normalizedThemeName}`,
            workspaceId: feedback.workspaceId,
          },
        });
      }

      await prisma.feedbackTheme.upsert({
        where: {
          feedbackId_themeId: {
            feedbackId,
            themeId: theme.id,
          },
        },
        update: {
          confidence: themeData.confidence,
        },
        create: {
          feedbackId,
          themeId: theme.id,
          confidence: themeData.confidence,
        },
      });
    }

    await storeFeedbackEmbedding(
      feedbackId,
      content,
      classification.featureArea,
    );

    return true;
  } catch (error) {
    console.error(`AI processing failed for feedback ${feedbackId}:`, error);
    return false;
  }
};

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const allowedRoles: Role[] = [Role.ADMIN, Role.ANALYST];

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to import feedback.",
        },
        { status: 403 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const csvText = typeof body.csv === "string" ? body.csv : "";

    if (!csvText.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV content is required.",
        },
        { status: 400 },
      );
    }

    const rows = parseCsv(csvText);

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "CSV must contain a header row and at least one feedback row.",
        },
        { status: 400 },
      );
    }

    if (rows.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV import is limited to 500 feedback items at a time.",
        },
        { status: 400 },
      );
    }

    const validRows = rows
      .map((row) => ({
        content: row.content?.trim() ?? "",
        channel: row.channel?.trim() || "CSV",
        customerLabel: row.customer_label?.trim() || null,
        createdAt: row.created_at?.trim() || null,
      }))
      .filter((row) => row.content.length > 0);

    if (validRows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid feedback rows were found in the CSV.",
        },
        { status: 400 },
      );
    }

    const feedbacks = await prisma.$transaction(
      validRows.map((row) =>
        prisma.feedback.create({
          data: {
            content: row.content,
            channel: row.channel,
            customerLabel: row.customerLabel,
            createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
            workspaceId: user.workspaceId,
          },
        }),
      ),
    );

    let aiClassifiedCount = 0;

    for (const feedback of feedbacks) {
      const classified = await processFeedbackWithAI(
        feedback.id,
        feedback.content,
      );

      if (classified) {
        aiClassifiedCount += 1;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `${feedbacks.length} feedback item${feedbacks.length === 1 ? "" : "s"} imported successfully.`,
        importedCount: feedbacks.length,
        aiClassifiedCount,
        aiClassified: aiClassifiedCount > 0,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Bulk feedback import error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while importing feedback.",
      },
      { status: 500 },
    );
  }
}

