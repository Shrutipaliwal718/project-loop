import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

// GET: List workspace members
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as any;

    const members = await prisma.user.findMany({
      where: { workspaceId: user.workspaceId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ members });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch members' }, { status: 400 });
  }
}

// POST: Invite/Create new team member (ADMIN Only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = session.user as any;

    // Strict 403 Forbidden check for non-ADMIN users
    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '403 Forbidden: Only ADMINs can manage members & roles' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, role } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    const defaultPassword = await bcrypt.hash('admin123', 10);

    const newMember = await prisma.user.create({
      data: {
        name,
        email,
        password: defaultPassword,
        role: (role as Role) || Role.ANALYST,
        workspaceId: currentUser.workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to invite member' }, { status: 400 });
  }
}
