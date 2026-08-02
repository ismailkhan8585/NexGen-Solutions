import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await ensurePrismaConnection();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const category = searchParams.get('category');

    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleAr: true,
        excerptEn: true,
        excerptAr: true,
        coverImage: true,
        category: true,
        author: true,
        readTime: true,
        publishedAt: true,
      },
    });

    return NextResponse.json(posts.map((p) => ({ ...p, category: p.category })), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
