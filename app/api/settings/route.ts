import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensurePrismaConnection();
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return NextResponse.json({
        totalProjects: 100,
        totalClients: 50,
        totalCountries: 10,
        yearsExperience: 5,
        companyNameEn: 'NexGen Solutions',
        companyNameAr: 'نيكست جن سولوشنز',
        taglineEn: "Building Tomorrow's Digital World. Today.",
        taglineAr: 'نبني عالمك الرقمي. اليوم.',
        email: 'hello@nexgensolutions.agency',
        phone: '+923000000000',
        whatsapp: '923000000000',
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return NextResponse.json(
      {
        totalProjects: 100,
        totalClients: 50,
        totalCountries: 10,
        yearsExperience: 5,
      },
      { status: 200 }
    );
  }
}
