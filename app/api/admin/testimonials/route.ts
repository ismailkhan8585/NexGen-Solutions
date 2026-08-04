import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const created = await prisma.testimonial.create({
    data: {
      clientName: body.clientName,
      clientRole: body.clientRole || null,
      clientCompany: body.clientCompany || null,
      clientCountry: body.clientCountry || null,
      reviewEn: body.reviewEn,
      rating: body.rating ?? 5,
      isApproved: true,
      isVerified: false,
    },
  });
  revalidatePath('/', 'layout');
  return NextResponse.json(created, { status: 201 });
}
