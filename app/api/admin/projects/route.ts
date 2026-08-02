import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, titleEn: true, titleAr: true, category: true, coverImage: true, featured: true, isActive: true },
  });
  return NextResponse.json(projects.map((p) => ({ ...p, category: p.category })));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const created = await prisma.project.create({
    data: {
      slug: body.slug,
      titleEn: body.titleEn,
      titleAr: body.titleAr || null,
      category: body.category,
      coverImage: body.coverImage || null,
      descriptionEn: body.descriptionEn || null,
      techStack: body.techStack ?? [],
      liveUrl: body.liveUrl || null,
      isActive: true,
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(created);
}
