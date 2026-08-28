import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const companyName = searchParams.get('companyName');

    const user = session.user as any;
    let whereClause: any = { workspaceId: user.workspaceId };

    // If companyName is specified, find that specific workspace
    if (companyName) {
      const targetWorkspace = await prisma.workspace.findFirst({
        where: { name: { equals: companyName, mode: 'insensitive' } },
      });

      if (targetWorkspace) {
        whereClause = { workspaceId: targetWorkspace.id };
      }
    }

    const feedbacks = await prisma.feedback.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ feedbacks });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch feedback' }, { status: 400 });
  }
}
