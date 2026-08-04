import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  const nameEn = cleanAdminText(body.nameEn, 200);
  if (nameEn.length < 2) return NextResponse.json({ error: 'validation_failed' }, { status: 400 });

  const item = await prisma.service.update({
    where: { id },
    data: {
      nameEn,
      nameAr: cleanAdminText(body.nameAr, 200) || null,
      descriptionEn: cleanAdminText(body.descriptionEn) || null,
      descriptionAr: cleanAdminText(body.descriptionAr) || null,
      sortOrder: Math.max(0, Number(body.sortOrder) || 0),
      isActive: body.isActive !== false,
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(item);
}

export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const auth = await requireAdmin(true);
  if (auth.response) return auth.response;
  await prisma.service.delete({ where: { id } });
  revalidatePath('/', 'layout');
  return NextResponse.json({ success: true });
}
