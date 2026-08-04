import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogCategory } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';
export const dynamic = 'force-dynamic'; export const runtime = 'nodejs';
const categories = new Set(Object.values(BlogCategory));
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await requireAdmin();if (auth.response) return auth.response;
  let body: Record<string, unknown>;try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  if (body.isPublished !== undefined && (auth.session!.user as { role?: string }).role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const data: Record<string, unknown> = {};
  if (body.slug !== undefined) { const slug = cleanAdminText(body.slug, 100).toLowerCase().replace(/[^a-z0-9-]/g, ''); if (!slug) return NextResponse.json({ error: 'validation_failed' }, { status: 400 }); data.slug = slug; }
  for (const [field, max] of [['titleEn', 240], ['titleAr', 240], ['author', 160], ['excerptEn', 1000], ['excerptAr', 1000], ['contentEn', 50_000], ['contentAr', 50_000]] as const) if (body[field] !== undefined) data[field] = cleanAdminText(body[field], max) || null;
  if (body.category !== undefined) { const category = cleanAdminText(body.category, 40) as BlogCategory; if (!categories.has(category)) return NextResponse.json({ error: 'validation_failed' }, { status: 400 }); data.category = category; }
  if (body.readTime !== undefined) data.readTime = Math.min(120, Math.max(1, Number(body.readTime) || 5));
  if (body.isPublished !== undefined) { data.isPublished = body.isPublished === true; data.publishedAt = body.isPublished === true ? new Date() : null; }
  try { const updated = await prisma.blogPost.update({ where: { id: params.id }, data }); revalidatePath('/', 'layout'); return NextResponse.json(updated); } catch { return NextResponse.json({ error: 'save_failed' }, { status: 400 }); }
}
export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await requireAdmin(true);if (auth.response) return auth.response;try { await prisma.blogPost.delete({ where: { id: params.id } }); revalidatePath('/', 'layout'); return NextResponse.json({ success: true }); } catch { return NextResponse.json({ error: 'delete_failed' }, { status: 400 }); }
}
