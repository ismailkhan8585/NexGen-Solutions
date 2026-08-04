import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Hero } from '@/components/sections/hero';
import { Credibility } from '@/components/sections/credibility';
import { Services } from '@/components/sections/services';
import { WhyUs } from '@/components/sections/why-us';
import { IndustryPreview } from '@/components/sections/industry-preview';
import { Portfolio } from '@/components/sections/portfolio';
import { Process } from '@/components/sections/process';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { DeferredContact } from '@/components/sections/deferred-contact';
import { FinalCta } from '@/components/sections/final-cta';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { listFaqs } from '@/lib/faqs';
import { localizedMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';

// Revalidate periodically as a safety net. Relevant admin mutations invalidate the page immediately.
export const revalidate = 300;

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return localizedMetadata(
    locale,
    '',
    locale === 'ar' ? 'نيكس جين سولوشنز | حلول رقمية للأعمال في السعودية' : 'NexGen Solutions | Digital Solutions for Saudi Businesses',
    locale === 'ar' ? 'تصميم وتطوير مواقع وتطبيقات وحلول برمجية مخصصة للأعمال في السعودية.' : 'Websites, applications, and custom software solutions for businesses across Saudi Arabia.',
  );
}

async function loadHomepageData(locale: Locale) {
  await ensurePrismaConnection();
  const [services, projects, testimonials] = await prisma.$transaction([
    prisma.service.findMany({
      where: { isActive: true, ...(locale === 'ar' ? { nameAr: { not: null }, descriptionAr: { not: null } } : {}) },
      orderBy: { sortOrder: 'asc' },
      take: 20,
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
      where: { isActive: true, isVerified: true, featured: true, ...(locale === 'ar' ? { titleAr: { not: null } } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleAr: true,
        category: true,
        classification: true,
        challengeEn: true,
        challengeAr: true,
        solutionEn: true,
        solutionAr: true,
        featuresEn: true,
        featuresAr: true,
        coverImage: true,
        liveUrl: true,
        techStack: true,
      },
    }),
    prisma.testimonial.findMany({
      where: { isApproved: true, isVerified: true, ...(locale === 'ar' ? { reviewAr: { not: null } } : {}) },
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
  const faqs = await listFaqs(true).then((items) => items.slice(0, 12)).catch(() => []);
  return { services, projects, testimonials, faqs };
}

type HomepageData = Awaited<ReturnType<typeof loadHomepageData>>;
type DataProps = { data: Promise<HomepageData>; locale: Locale };

async function HomepageServices({ data, locale }: DataProps) {
  return <Services services={(await data).services} locale={locale} />;
}

async function HomepagePortfolio({ data, locale }: DataProps) {
  return <Portfolio projects={(await data).projects} locale={locale} />;
}

async function HomepageTestimonials({ data, locale }: DataProps) {
  const testimonials = (await data).testimonials;
  return testimonials.length > 0 ? <Testimonials testimonials={testimonials} locale={locale} /> : null;
}

async function HomepageFaq({ data, locale }: DataProps) {
  return <FAQ items={(await data).faqs} locale={locale} />;
}

function SectionFallback({ label, minHeight = 'min-h-[520px]' }: { label: string; minHeight?: string }) {
  return (
    <section className="section-padding bg-surface" aria-label={label} aria-busy="true">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className={`${minHeight} rounded-3xl border border-surface-border bg-surface-card/40`} />
      </div>
    </section>
  );
}

export default async function HomePage(props: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await props.params;
  const data = loadHomepageData(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero locale={locale} />
        <Credibility locale={locale} />
        <Suspense fallback={<SectionFallback label={locale === 'ar' ? 'جارٍ تحميل الخدمات' : 'Loading services'} />}>
          <HomepageServices data={data} locale={locale} />
        </Suspense>
        <IndustryPreview locale={locale} />
        <Suspense fallback={<SectionFallback label={locale === 'ar' ? 'جارٍ تحميل الأعمال' : 'Loading selected work'} minHeight="min-h-[640px]" />}>
          <HomepagePortfolio data={data} locale={locale} />
        </Suspense>
        <Process locale={locale} />
        <WhyUs locale={locale} />
        <Suspense fallback={null}>
          <HomepageTestimonials data={data} locale={locale} />
        </Suspense>
        <Suspense fallback={<SectionFallback label={locale === 'ar' ? 'جارٍ تحميل الأسئلة الشائعة' : 'Loading frequently asked questions'} />}>
          <HomepageFaq data={data} locale={locale} />
        </Suspense>
        <DeferredContact locale={locale} />
        <FinalCta locale={locale} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
