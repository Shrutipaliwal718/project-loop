import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { answerRAGQuery } from '@/lib/ai-engine';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as any;
    const body = await req.json();
    const { query, companyName } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Please enter a search query' }, { status: 400 });
    }

    let targetWorkspaceId = user.workspaceId;
    if (companyName) {
      const target = await prisma.workspace.findFirst({
        where: { name: { equals: companyName, mode: 'insensitive' } },
      });
      if (target) {
        targetWorkspaceId = target.id;
      }
    }

    const result = await answerRAGQuery(query, targetWorkspaceId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'RAG query failed' }, { status: 400 });
  }
}
