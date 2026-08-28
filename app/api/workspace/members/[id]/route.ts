import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

// PATCH: Update team member role (ADMIN Only)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const memberId = params.id;
    const body = await req.json();
    const { role } = body;

    if (!role || !Object.values(Role).includes(role)) {
      return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    const updatedMember = await prisma.user.update({
      where: { id: memberId },
      data: { role: role as Role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update role' }, { status: 400 });
  }
}

// DELETE: Remove member from workspace (ADMIN Only)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const memberId = params.id;

    // Prevent self-deletion
    if (memberId === currentUser.id) {
      return NextResponse.json({ error: 'You cannot remove yourself from the workspace' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: memberId },
    });

    return NextResponse.json({ success: true, deletedId: memberId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete member' }, { status: 400 });
  }
}
