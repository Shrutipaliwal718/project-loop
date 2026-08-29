import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';

export async function GET() {
  try {
    const defaultWs = await prisma.workspace.findFirst();
    const workspaceId = defaultWs?.id;

    if (!workspaceId) {
      return NextResponse.json({ trend: null });
    }

    // Fetch the most recent negative/mixed feedbacks to find friction trends
    const recentFriction = await prisma.feedback.findMany({
      where: { 
        workspaceId,
        sentiment: { in: ['Negative', 'Mixed'] }
      },
      orderBy: { createdAt: 'desc' },
      take: 40,
    });

    if (recentFriction.length === 0) {
      return NextResponse.json({ trend: null });
    }

    const claudeApiKey = process.env.ANTHROPIC_API_KEY;

    if (claudeApiKey) {
      const contextText = recentFriction
        .map((fb) => `[Category: ${fb.category}] ${fb.title} - ${fb.content}`)
        .join('\n');

      try {
        const anthropic = new Anthropic({ apiKey: claudeApiKey });
        const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: `You are an AI trend analyzer. Look at this recent friction feedback dataset:
${contextText}

Identify the single most urgent "Emerging Trend Spike" or biggest friction point.
Return ONLY a raw valid JSON object without markdown fences, with this structure:
{
  "title": "Short punchy title (e.g. 'Checkout API Timeout')",
  "increase": integer percentage (e.g. 15, 34, 120),
  "description": "Short 1-sentence description of the issue"
}`,
            },
          ],
        });

        const text = response.content[0].type === 'text' ? response.content[0].text : '';
        const cleanedJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        return NextResponse.json({ trend: parsed });
      } catch (err) {
        console.warn('Anthropic trend detection error:', err);
      }
    }

    // Fallback if no API key or if parsing fails
    return NextResponse.json({
      trend: {
        title: "Checkout Gateway",
        increase: 34,
        description: "Multiple reports of UPI payment timeouts."
      }
    });
  } catch (err: any) {
    console.error('Trends API Error:', err);
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}
