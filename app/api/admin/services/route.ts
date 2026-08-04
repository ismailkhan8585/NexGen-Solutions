import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  return NextResponse.json(await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }));
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  const slug = cleanAdminText(body.slug, 80).toLowerCase().replace(/[^a-z0-9-]/g, '');
  const nameEn = cleanAdminText(body.nameEn, 200);
  if (!slug || nameEn.length < 2) return NextResponse.json({ error: 'validation_failed' }, { status: 400 });

  const item = await prisma.service.create({
    data: {
      slug,
      nameEn,
      nameAr: cleanAdminText(body.nameAr, 200) || null,
      descriptionEn: cleanAdminText(body.descriptionEn) || null,
      descriptionAr: cleanAdminText(body.descriptionAr) || null,
      icon: cleanAdminText(body.icon, 80) || 'Code',
      features: [],
      techStack: [],
      sortOrder: Math.max(0, Number(body.sortOrder) || 0),
      isActive: body.isActive !== false,
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(item, { status: 201 });
}
