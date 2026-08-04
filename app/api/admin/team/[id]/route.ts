import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  if (body.isVerified !== undefined && (session.user as { role?: string }).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const data: Record<string, unknown> = {};
  for (const field of ['nameEn', 'nameAr', 'role', 'roleAr', 'bio', 'bioAr', 'photo', 'skills', 'sortOrder', 'isActive', 'isVerified']) {
    if (body[field] !== undefined) data[field] = body[field];
  }

  const updated = await prisma.teamMember.update({ where: { id: params.id }, data });
  revalidatePath('/', 'layout');
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as { role?: string }).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.teamMember.delete({ where: { id: params.id } });
  revalidatePath('/', 'layout');
  return NextResponse.json({ success: true });
}
