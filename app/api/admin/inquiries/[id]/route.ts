import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['NEW', 'READ', 'REPLIED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await prisma.projectInquiry.update({
      where: { id: params.id },
      data: { status: status as 'NEW' | 'READ' | 'REPLIED' | 'IN_PROGRESS' | 'CONVERTED' | 'CLOSED', isRead: true },
    });

    revalidatePath('/admin', 'layout');
    return NextResponse.json({
      ...updated,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
