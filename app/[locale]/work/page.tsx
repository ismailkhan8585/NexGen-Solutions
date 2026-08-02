import type { Metadata } from 'next';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { WorkBrowser } from '@/components/work/work-browser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return params.locale === 'ar' ? { title: 'أعمالنا', description: 'مشاريع ودراسات حالة منشورة من نيكس جين سولوشنز.' } : { title: 'Our Work', description: 'Published projects and case studies from NexGen Solutions.' };
}

export default async function WorkPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  await ensurePrismaConnection();
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
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
  });

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
            <WorkBrowser locale={params.locale} projects={projects} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
