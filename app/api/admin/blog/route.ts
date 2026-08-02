import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, titleEn: true, titleAr: true, category: true, isPublished: true, author: true, readTime: true },
  });
  return NextResponse.json(posts.map((p) => ({ ...p, category: p.category })));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const created = await prisma.blogPost.create({
    data: {
      slug: body.slug,
      titleEn: body.titleEn,
      titleAr: body.titleAr || null,
      category: body.category,
      author: body.author,
      readTime: body.readTime ?? 5,
      excerptEn: body.excerptEn || null,
      contentEn: body.contentEn || null,
      isPublished: body.isPublished ?? false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : (body.isPublished ? new Date() : null),
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(created);
}
