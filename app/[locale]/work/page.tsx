import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { WorkBrowser } from '@/components/work/work-browser';
import { localizedMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(props: { params: Promise<{ locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const params = await props.params;
  const meta = params.locale === 'ar' ? { title: 'أعمالنا', description: 'مشاريع ودراسات حالة منشورة من نيكس جين سولوشنز.' } : { title: 'Our Work', description: 'Published projects and case studies from NexGen Solutions.' };
  return localizedMetadata(params.locale, 'work', meta.title, meta.description);
}

export default async function WorkPage(props: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const params = await props.params;
  let unavailable = false;
  let projects: Awaited<ReturnType<typeof loadProjects>> = [];
  try {
    projects = await loadProjects(params.locale);
  } catch {
    unavailable = true;
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <GradientBadge className="mb-4">{params.locale === 'ar' ? 'أعمالنا' : 'Our Work'}</GradientBadge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {params.locale === 'ar' ? 'أعمال رقمية مصممة لخدمة أهداف واضحة' : 'Digital work designed around clear goals'}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                {params.locale === 'ar' ? 'نعرض فقط المشاريع المنشورة ونوضح المشاريع التجريبية بصراحة.' : 'Only published work is shown, and demo projects are clearly identified.'}
              </p>
            </div>
            {unavailable ? <ProjectsUnavailable locale={params.locale} /> : <WorkBrowser locale={params.locale} projects={projects} />}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

async function loadProjects(locale: 'ar' | 'en') {
  await ensurePrismaConnection();
  return prisma.project.findMany({
    where: { isActive: true, isVerified: true, ...(locale === 'ar' ? { titleAr: { not: null } } : {}) },
    orderBy: { createdAt: 'desc' },
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
  });
}

function ProjectsUnavailable({ locale }: { locale: 'ar' | 'en' }) {
  const ar = locale === 'ar';
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-amber-500/20 bg-surface-card px-6 py-14 text-center sm:px-10">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold text-white">{ar ? 'المشاريع غير متاحة مؤقتاً' : 'Projects are temporarily unavailable'}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-secondary">{ar ? 'تعذر الاتصال بخدمة المشاريع الآن. مشاريعك المنشورة محفوظة وستظهر تلقائياً عند عودة الاتصال.' : 'The project service cannot be reached right now. Your published projects remain saved and will appear automatically when the connection returns.'}</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={`/${locale}/work`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 font-semibold text-surface">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />{ar ? 'إعادة المحاولة' : 'Try again'}
        </Link>
        <Link href={`/${locale}/contact`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-surface-border px-5 font-semibold text-white hover:bg-surface-hover">{ar ? 'تواصل معنا' : 'Contact us'}</Link>
      </div>
    </div>
  );
}
