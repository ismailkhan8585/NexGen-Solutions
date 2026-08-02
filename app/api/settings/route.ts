import { NextResponse } from 'next/server';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { businessConfig } from '@/lib/business-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensurePrismaConnection();
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return NextResponse.json({
        totalProjects: 0,
        totalClients: 0,
        totalCountries: 0,
        yearsExperience: 0,
        companyNameEn: businessConfig.companyName.en,
        companyNameAr: businessConfig.companyName.ar,
        taglineEn: null,
        taglineAr: null,
        email: businessConfig.businessEmail,
        phone: businessConfig.phone,
        whatsapp: businessConfig.whatsapp,
      });
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      {
        totalProjects: 0,
        totalClients: 0,
        totalCountries: 0,
        yearsExperience: 0,
        degraded: true,
      },
      { status: 200 }
    );
  }
}
