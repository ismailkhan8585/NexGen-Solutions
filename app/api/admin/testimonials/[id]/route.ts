import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const data: Record<string, unknown> = {};
  for (const field of ['clientName', 'clientRole', 'clientCompany', 'clientCountry', 'reviewEn', 'rating', 'isApproved', 'isFeatured']) {
    if (body[field] !== undefined) data[field] = body[field];
  }

  const updated = await prisma.testimonial.update({ where: { id: params.id }, data });
  revalidatePath('/', 'layout');
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as { role?: string }).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.testimonial.delete({ where: { id: params.id } });
  revalidatePath('/', 'layout');
  return NextResponse.json({ success: true });
}
