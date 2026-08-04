import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { SaudiMarket } from '@/components/sections/saudi-market';
import { Portfolio } from '@/components/sections/portfolio';
import { Process } from '@/components/sections/process';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { listFaqs } from '@/lib/faqs';
import type { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(props: { params: Promise<{ locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return localizedMetadata(
    locale,
    '',
    locale === 'ar' ? 'نيكس جين سولوشنز | حلول رقمية للأعمال في السعودية' : 'NexGen Solutions | Digital Solutions for Saudi Businesses',
    locale === 'ar' ? 'تصميم وتطوير مواقع وتطبيقات وحلول برمجية مخصصة للأعمال في السعودية.' : 'Websites, applications, and custom software solutions for businesses across Saudi Arabia.',
  );
}

export default async function HomePage(props: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const params = await props.params;
  await ensurePrismaConnection();
  const [services, projects, testimonials] =
    await prisma.$transaction([
      prisma.service.findMany({
        where: { isActive: true, ...(params.locale === 'ar' ? { nameAr: { not: null }, descriptionAr: { not: null } } : {}) },
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
        where: { isActive: true, isVerified: true, featured: true, ...(params.locale === 'ar' ? { titleAr: { not: null } } : {}) },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
          id: true,
          slug: true,
          titleEn: true,
          titleAr: true,
          category: true,
          classification: true,
          coverImage: true,
          liveUrl: true,
          techStack: true,
        },
      }),
      prisma.testimonial.findMany({
        where: { isApproved: true, isVerified: true, ...(params.locale === 'ar' ? { reviewAr: { not: null } } : {}) },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          clientName: true,
          clientRole: true,
          clientCompany: true,
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
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        <FAQ items={faqs} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
