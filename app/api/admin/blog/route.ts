import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogCategory } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';

export const runtime = 'nodejs';
const categories = new Set(Object.values(BlogCategory));
export async function GET() { const auth = await requireAdmin(); if (auth.response) return auth.response; return NextResponse.json(await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, slug: true, titleEn: true, titleAr: true, excerptEn: true, excerptAr: true, contentEn: true, contentAr: true, category: true, isPublished: true, author: true, readTime: true } })); }
export async function POST(request: Request) {
  const auth = await requireAdmin(); if (auth.response) return auth.response;
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  const publish = body.isPublished === true;
  if (publish && (auth.session!.user as { role?: string }).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const slug = cleanAdminText(body.slug, 100).toLowerCase().replace(/[^a-z0-9-]/g, '');
  const titleEn = cleanAdminText(body.titleEn, 240); const author = cleanAdminText(body.author, 160);
  const category = cleanAdminText(body.category, 40) as BlogCategory;
  if (!slug || titleEn.length < 5 || author.length < 2 || !categories.has(category)) return NextResponse.json({ error: 'validation_failed' }, { status: 400 });
  try {
    const created = await prisma.blogPost.create({ data: { slug, titleEn, titleAr: cleanAdminText(body.titleAr, 240) || null, category, author, readTime: Math.min(120, Math.max(1, Number(body.readTime) || 5)), excerptEn: cleanAdminText(body.excerptEn, 1000) || null, excerptAr: cleanAdminText(body.excerptAr, 1000) || null, contentEn: cleanAdminText(body.contentEn, 50_000) || null, contentAr: cleanAdminText(body.contentAr, 50_000) || null, isPublished: publish, publishedAt: publish ? new Date() : null } });
    revalidatePath('/', 'layout'); return NextResponse.json(created, { status: 201 });
  } catch { return NextResponse.json({ error: 'save_failed' }, { status: 400 }); }
}
