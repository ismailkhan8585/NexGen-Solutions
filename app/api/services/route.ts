import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensurePrismaConnection();
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(services, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
