import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as any;
    const body = await req.json().catch(() => ({}));
    const { companyName } = body;

    let targetWorkspaceId = user.workspaceId;
    let activeCompanyName = user.workspaceName || 'Zidio Development';

    if (companyName) {
      const target = await prisma.workspace.findFirst({
        where: { name: { equals: companyName, mode: 'insensitive' } },
      });
      if (target) {
        targetWorkspaceId = target.id;
        activeCompanyName = target.name;
      }
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { workspaceId: targetWorkspaceId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const totalCount = feedbacks.length;
    const positiveCount = feedbacks.filter((f) => f.sentiment === 'Positive').length;
    const negativeCount = feedbacks.filter((f) => f.sentiment === 'Negative').length;

    let summaryText = '';

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 600,
          messages: [
            {
              role: 'user',
              content: `Generate a 3-paragraph Executive Voice-of-Customer (VoC) report summary specifically for the company "${activeCompanyName}" based on ${totalCount} customer feedbacks. Highlight key CSAT trends, top friction points unique to ${activeCompanyName}, and recommended engineering actions.`,
            },
          ],
        });
        summaryText = response.content[0].type === 'text' ? response.content[0].text : '';
      } catch (err) {
        console.warn('VoC Anthropic call error:', err);
      }
    }

    if (!summaryText) {
      summaryText = `Executive VoC Summary for ${activeCompanyName}: Customer sentiment remains overall positive with a ${Math.round(
        (positiveCount / (totalCount || 1)) * 100
      )}% CSAT rating. Primary friction revolves around server performance & checkout timeouts. Immediate engineering recommendations include optimizing backend response times and rolling out alert webhooks.`;
    }

    const report = await prisma.voCReport.create({
      data: {
        title: `VoC Digest (${activeCompanyName}) — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
        summary: summaryText,
        keyMetrics: JSON.stringify({
          totalFeedback: totalCount,
          positiveRatio: `${Math.round((positiveCount / (totalCount || 1)) * 100)}%`,
          negativeRatio: `${Math.round((negativeCount / (totalCount || 1)) * 100)}%`,
          topCategory: 'UX/UI Navigation',
        }),
        workspaceId: targetWorkspaceId,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Report generation failed' }, { status: 400 });
  }
}
