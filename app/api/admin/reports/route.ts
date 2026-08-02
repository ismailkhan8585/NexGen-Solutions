import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const inquiries = await prisma.projectInquiry.findMany();
  const blogPosts = await prisma.blogPost.findMany({ where: { isPublished: true }, select: { titleEn: true, views: true } });

  const byServiceMap = new Map<string, number>();
  const byCountryMap = new Map<string, number>();
  const byStatusMap = new Map<string, number>();

  inquiries.forEach((inq) => {
    byServiceMap.set(inq.service, (byServiceMap.get(inq.service) ?? 0) + 1);
    if (inq.company) byCountryMap.set(inq.company, (byCountryMap.get(inq.company) ?? 0) + 1);
    byStatusMap.set(inq.status, (byStatusMap.get(inq.status) ?? 0) + 1);
  });

  return NextResponse.json({
    totalInquiries: inquiries.length,
    convertedInquiries: inquiries.filter((i) => i.status === 'CONVERTED').length,
    byService: Array.from(byServiceMap.entries()).map(([service, count]) => ({ service, count })).sort((a, b) => b.count - a.count),
    byCountry: Array.from(byCountryMap.entries()).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count),
    byStatus: Array.from(byStatusMap.entries()).map(([status, count]) => ({ status, count })),
    blogViews: blogPosts.map((p) => ({ title: p.titleEn, views: p.views })).sort((a, b) => b.views - a.views),
  });
}
