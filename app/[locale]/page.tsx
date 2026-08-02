import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { SaudiMarket } from '@/components/sections/saudi-market';
import { Portfolio } from '@/components/sections/portfolio';
import { Process } from '@/components/sections/process';
import { TechStack } from '@/components/sections/tech-stack';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { listFaqs } from '@/lib/faqs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  await ensurePrismaConnection();
  const [services, projects, testimonials] =
    await prisma.$transaction([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        take: 6,
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
    ]);
  const faqs = await listFaqs(true).then(items => items.slice(0, 12)).catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services services={services} />
        <WhyUs />
        <SaudiMarket />
        <Portfolio projects={projects} />
        <Process />
        <TechStack />
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        <FAQ items={faqs} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
