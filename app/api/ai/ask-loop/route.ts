import { NextResponse } from 'next/server';
import { answerRAGQuery } from '@/lib/ai-engine';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { query, companyName } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Please enter a search query' }, { status: 400 });
    }

    let targetWorkspaceId = '';
    const searchName = companyName || 'Zidio Development';

    const target = await prisma.workspace.findFirst({
      where: { name: { equals: searchName, mode: 'insensitive' } },
    });
    if (target) {
      targetWorkspaceId = target.id;
    }

    if (!targetWorkspaceId) {
      const defaultWs = await prisma.workspace.findFirst();
      targetWorkspaceId = defaultWs?.id || '';
    }

    const result = await answerRAGQuery(query, targetWorkspaceId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'RAG query failed' }, { status: 400 });
  }
}
