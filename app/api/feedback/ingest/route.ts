import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { classifyFeedback } from '@/lib/ai-engine';
import { z } from 'zod';

const SingleIngestSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(5),
  channel: z.string().default('Manual Entry'),
  customerSegment: z.string().optional().default('Pro'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as any;
    const workspaceId = user.workspaceId;

    // RBAC check: Viewers cannot ingest data
    if (user.role === 'VIEWER') {
      return NextResponse.json({ error: 'Viewers cannot ingest feedback data' }, { status: 403 });
    }

    const body = await req.json();

    // 1. Bulk / CSV Ingestion
    if (body.type === 'csv' && Array.isArray(body.items)) {
      const createdItems = [];
      for (const item of body.items) {
        if (!item.title || !item.content) continue;
        const aiResult = await classifyFeedback(item.title, item.content);
        const fb = await prisma.feedback.create({
          data: {
            title: item.title,
            content: item.content,
            channel: item.channel || 'CSV Upload',
            customerSegment: item.customerSegment || 'Pro',
            sentiment: aiResult.sentiment,
            sentimentScore: aiResult.sentimentScore,
            category: aiResult.category,
            workspaceId,
          },
        });
        createdItems.push(fb);
      }
      return NextResponse.json({ success: true, count: createdItems.length, items: createdItems });
    }

    // 2. Simulated Channel Preset Webhook Ingestion
    if (body.type === 'simulated') {
      const presets: Record<string, { title: string; content: string; channel: string }> = {
        zendesk: {
          title: 'Urgent: Unable to access billing settings in Chrome',
          content: 'Support ticket #8492: User reports infinite spinning wheel on billing tab when using Google Chrome version 126.',
          channel: 'Zendesk',
        },
        intercom: {
          title: 'Love the new AI Q&A search bar feature!',
          content: 'Live Chat chat #391: Highly productive team feature. Saved our product managers 5 hours of manual analysis this week.',
          channel: 'Intercom',
        },
        appstore: {
          title: 'Mobile app keeps logging out every 2 hours',
          content: 'iOS App Review 5-Stars: Great web platform, but the mobile app session expires too rapidly.',
          channel: 'App Store',
        },
        playstore: {
          title: 'Smooth UI and great dark mode theme',
          content: 'Android Review 4-Stars: Modern dark UI renders beautifully on OLED screens.',
          channel: 'Play Store',
        },
        trustpilot: {
          title: 'Best Voice-of-Customer reporting tool in 2026',
          content: 'Trustpilot 5/5: Transformed our product feedback analysis completely within 3 days.',
          channel: 'Trustpilot',
        },
      };

      const preset = presets[body.preset || 'zendesk'];
      const aiResult = await classifyFeedback(preset.title, preset.content);

      const fb = await prisma.feedback.create({
        data: {
          title: preset.title,
          content: preset.content,
          channel: preset.channel,
          customerSegment: 'Enterprise',
          sentiment: aiResult.sentiment,
          sentimentScore: aiResult.sentimentScore,
          category: aiResult.category,
          workspaceId,
        },
      });

      return NextResponse.json({ success: true, item: fb });
    }

    // 3. Single Manual Ingestion
    const parsed = SingleIngestSchema.parse(body);
    const aiResult = await classifyFeedback(parsed.title, parsed.content);

    const feedback = await prisma.feedback.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        channel: parsed.channel,
        customerSegment: parsed.customerSegment,
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        category: aiResult.category,
        workspaceId,
      },
    });

    return NextResponse.json({ success: true, item: feedback });
  } catch (error: any) {
    console.error('Ingestion API Error:', error);
    return NextResponse.json({ error: error.message || 'Ingestion failed' }, { status: 400 });
  }
}
