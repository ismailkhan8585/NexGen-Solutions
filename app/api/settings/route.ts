import { NextResponse } from "next/server";
import { ensurePrismaConnection, prisma } from "@/lib/prisma";
import { businessConfig } from "@/lib/business-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensurePrismaConnection();
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return NextResponse.json(
        {
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
        },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=300, stale-while-revalidate=3600",
          },
        },
      );
    }
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        totalProjects: 0,
        totalClients: 0,
        totalCountries: 0,
        yearsExperience: 0,
        degraded: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300",
        },
      },
    );
  }
}
