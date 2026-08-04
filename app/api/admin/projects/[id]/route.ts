import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';
import { isSupportedImageUrl } from '@/lib/images';
import { getSafeExternalUrl } from '@/lib/projects';

const list = (value: unknown) => Array.isArray(value) ? value.map(item => cleanAdminText(item, 200)).filter(Boolean).slice(0, 30) : [];

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await requireAdmin();if (auth.response) return auth.response;
  let body: Record<string, unknown>;try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  if ((auth.session!.user as { role?: string }).role !== 'SUPER_ADMIN') {
    const current = await prisma.project.findUnique({ where: { id: params.id }, select: { isVerified: true, resultsVerified: true, classification: true } });
    if (!current) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    const protectedChange = (body.isVerified !== undefined && body.isVerified !== current.isVerified) || (body.resultsVerified !== undefined && body.resultsVerified !== current.resultsVerified) || (body.classification !== undefined && body.classification !== current.classification);
    if (protectedChange) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const data: Record<string, unknown> = {};
  for (const key of ['titleEn','titleAr','clientName','industryEn','industryAr','descriptionEn','descriptionAr','challengeEn','challengeAr','solutionEn','solutionAr','resultsEn','resultsAr','durationEn','durationAr']) if (body[key] !== undefined) data[key] = cleanAdminText(body[key], 5000) || null;
  for (const key of ['featuresEn','featuresAr','techStack']) if (body[key] !== undefined) data[key] = list(body[key]);
  if (body.coverImage !== undefined) { const value = cleanAdminText(body.coverImage, 1000); data.coverImage = isSupportedImageUrl(value) ? value : null; }
  if (body.photos !== undefined) data.photos = list(body.photos).filter(isSupportedImageUrl);
  if (body.liveUrl !== undefined) data.liveUrl = getSafeExternalUrl(cleanAdminText(body.liveUrl, 1000));
  for (const key of ['featured','isActive','isVerified','resultsVerified']) if (typeof body[key] === 'boolean') data[key] = body[key];
  if (body.classification === 'CLIENT' || body.classification === 'DEMO') data.classification = body.classification;
  if (body.category) data.category = body.category;
  const updated = await prisma.project.update({ where: { id: params.id }, data });
  revalidatePath('/', 'layout');return NextResponse.json(updated);
}

export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await requireAdmin(true);if (auth.response) return auth.response;
  await prisma.project.delete({ where: { id: params.id } });revalidatePath('/', 'layout');return NextResponse.json({ success: true });
}
