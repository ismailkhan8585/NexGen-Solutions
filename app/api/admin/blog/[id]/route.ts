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

  for (const field of ['slug', 'titleEn', 'titleAr', 'category', 'author', 'readTime', 'excerptEn', 'contentEn', 'isPublished']) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (body.isPublished) data.publishedAt = new Date();

  const updated = await prisma.blogPost.update({ where: { id: params.id }, data });
  revalidatePath('/', 'layout');
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.blogPost.delete({ where: { id: params.id } });
  revalidatePath('/', 'layout');
  return NextResponse.json({ success: true });
}
