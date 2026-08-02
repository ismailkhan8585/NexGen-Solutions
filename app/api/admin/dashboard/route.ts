import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newInquiries = await prisma.projectInquiry.count({ where: { status: 'NEW' } });
    const projectsLive = await prisma.project.count({ where: { isActive: true } });
    const teamMembers = await prisma.teamMember.count({ where: { isActive: true } });
    const blogPosts = await prisma.blogPost.count({ where: { isPublished: true } });

    const recentInquiries = await prisma.projectInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        refNumber: true,
        clientName: true,
        service: true,
        status: true,
        createdAt: true,
      },
    });

    const inquiries = await prisma.projectInquiry.findMany({
      select: { createdAt: true },
    });

    const monthsMap = new Map<string, number>();
    inquiries.forEach((inq) => {
      const d = new Date(inq.createdAt);
      const key = d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
      monthsMap.set(key, (monthsMap.get(key) ?? 0) + 1);
    });

    const inquiriesByMonth = Array.from(monthsMap.entries())
      .slice(-6)
      .map(([month, count]) => ({ month, count }));

    return NextResponse.json({
      newInquiries,
      projectsLive,
      teamMembers,
      blogPosts,
      recentInquiries: recentInquiries.map((i) => ({
        ...i,
        status: i.status,
        createdAt: i.createdAt.toISOString(),
      })),
      inquiriesByMonth,
    });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
