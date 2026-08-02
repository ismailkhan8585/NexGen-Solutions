import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const created = await prisma.teamMember.create({
    data: {
      nameEn: body.nameEn,
      nameAr: body.nameAr || null,
      role: body.role,
      roleAr: body.roleAr || null,
      bio: body.bio || null,
      photo: body.photo || null,
      skills: body.skills ?? [],
      sortOrder: body.sortOrder ?? 99,
      isActive: true,
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(created);
}
