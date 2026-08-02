import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Hero } from '@/components/sections/hero';
import { TrustedBy } from '@/components/sections/trusted-by';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { Portfolio } from '@/components/sections/portfolio';
import { Process } from '@/components/sections/process';
import { TechStack } from '@/components/sections/tech-stack';
import { StatsCounter } from '@/components/sections/stats-counter';
import { Testimonials } from '@/components/sections/testimonials';
import { Pricing } from '@/components/sections/pricing';
import { Team } from '@/components/sections/team';
import { Blog } from '@/components/sections/blog';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { CTABanner } from '@/components/sections/cta-banner';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  await ensurePrismaConnection();
  const [settings, services, projects, testimonials, team, posts] =
    await prisma.$transaction([
      prisma.siteSettings.findFirst({
        select: {
          totalProjects: true,
          totalClients: true,
          totalCountries: true,
          yearsExperience: true,
        },
      }),
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          slug: true,
          nameEn: true,
          nameAr: true,
          descriptionEn: true,
          descriptionAr: true,
          icon: true,
          startingPrice: true,
          techStack: true,
        },
      }),
      prisma.project.findMany({
        where: { isActive: true, featured: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          slug: true,
          titleEn: true,
          titleAr: true,
          category: true,
          coverImage: true,
          liveUrl: true,
          techStack: true,
        },
      }),
      prisma.testimonial.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          clientName: true,
          clientRole: true,
          clientCompany: true,
          clientCountry: true,
          reviewEn: true,
          reviewAr: true,
          rating: true,
        },
      }),
      prisma.teamMember.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        take: 6,
        select: {
          id: true,
          nameEn: true,
          nameAr: true,
          role: true,
          roleAr: true,
          bio: true,
          bioAr: true,
          photo: true,
          linkedinUrl: true,
          skills: true,
        },
      }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: {
          id: true,
          slug: true,
          titleEn: true,
          titleAr: true,
          excerptEn: true,
          excerptAr: true,
          coverImage: true,
          category: true,
          author: true,
          readTime: true,
          publishedAt: true,
        },
      }),
    ]);

  const stats = settings ?? {
    totalProjects: 100,
    totalClients: 50,
    totalCountries: 10,
    yearsExperience: 5,
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero stats={stats} />
        <TrustedBy />
        <Services services={services} />
        <WhyUs />
        <Portfolio projects={projects} />
        <Process />
        <TechStack />
        <StatsCounter stats={stats} />
        <Testimonials testimonials={testimonials} />
        <Pricing />
        <Team members={team} />
        <Blog posts={posts.map((post) => ({
          ...post,
          publishedAt: post.publishedAt?.toISOString() ?? null,
        }))} />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
