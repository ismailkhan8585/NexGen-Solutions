import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await ensurePrismaConnection();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    const where: Record<string, unknown> = { isActive: true };
    if (featured === 'true') where.featured = true;
    if (category) where.category = category;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleAr: true,
        category: true,
        coverImage: true,
        liveUrl: true,
        githubUrl: true,
        techStack: true,
        featured: true,
      },
    });

    return NextResponse.json(
      projects.map((p) => ({ ...p, category: p.category })),
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
