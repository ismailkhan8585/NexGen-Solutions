import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensurePrismaConnection();
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true, isVerified: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
    return NextResponse.json(testimonials, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
