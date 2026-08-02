import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await prisma.siteSettings.findFirst();
  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const existing = await prisma.siteSettings.findFirst();

  if (!existing) {
    const created = await prisma.siteSettings.create({ data: body });
    return NextResponse.json(created);
  }

  const updated = await prisma.siteSettings.update({ where: { id: existing.id }, data: body });
  revalidatePath('/', 'layout');
  return NextResponse.json(updated);
}
