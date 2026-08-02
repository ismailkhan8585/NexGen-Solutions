import type { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { TechPill } from '@/components/ui/tech-pill';
import { Check, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

const getService = cache(async (slug: string) => {
  await ensurePrismaConnection();
  return prisma.service.findUnique({ where: { slug } });
});

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return {};
  return {
    title: params.locale === 'ar' ? service.nameAr ?? service.nameEn : service.nameEn,
    description: params.locale === 'ar' ? service.descriptionAr ?? service.descriptionEn : service.descriptionEn,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const service = await getService(params.slug);
  if (!service || !service.isActive) notFound();

  const serviceCategoryMap: Record<string, string> = {
    web: 'WEB',
    app: 'MOBILE',
    design: 'DESIGN',
    ecommerce: 'ECOMMERCE',
    software: 'SOFTWARE',
    ai: 'AI',
    marketing: 'MARKETING',
    cloud: 'CLOUD',
    security: 'SOFTWARE',
    consulting: 'SOFTWARE',
    saas: 'SAAS',
    blockchain: 'BLOCKCHAIN',
  };
  const relatedCategory = serviceCategoryMap[service.slug] ?? 'WEB';

  const projects = await prisma.project.findMany({
    where: { isActive: true, category: relatedCategory as never },
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, titleEn: true, titleAr: true, coverImage: true },
  });

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max max-w-4xl">
            <a href={`/${params.locale}/services`} className="inline-flex items-center gap-2 text-ink-secondary hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Services
            </a>

            <GradientBadge className="mb-4">{service.startingPrice}</GradientBadge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
              {params.locale === 'ar' ? service.nameAr ?? service.nameEn : service.nameEn}
            </h1>
            <p className="text-ink-secondary text-lg leading-relaxed mb-8">
              {params.locale === 'ar' ? service.descriptionAr ?? service.descriptionEn : service.descriptionEn}
            </p>

            <div className="flex flex-wrap gap-2 mb-12">
              {service.techStack.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>

            <h2 className="font-display font-semibold text-2xl text-white mb-6">What&apos;s Included</h2>
            <ul className="space-y-3 mb-12">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-ink-secondary">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="bg-surface-card border border-surface-border rounded-2xl p-8 text-center mb-12">
              <h2 className="font-display font-semibold text-2xl text-white mb-3">
                Ready to start?
              </h2>
              <p className="text-ink-secondary mb-6">
                Get a free consultation and quote for your project.
              </p>
              <a href={`/${params.locale}/contact`}>
                <GradientButton className="px-8 py-3.5 text-base">
                  Start This Service
                </GradientButton>
              </a>
            </div>

            {projects.length > 0 && (
              <>
                <h2 className="font-display font-semibold text-2xl text-white mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <a
                      key={project.id}
                      href={`/${params.locale}/work/${project.slug}`}
                      className="group rounded-2xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-borderHover transition-all"
                    >
                      {project.coverImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image src={project.coverImage} alt={project.titleEn} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-display font-medium text-white text-sm">
                          {params.locale === 'ar' ? project.titleAr ?? project.titleEn : project.titleEn}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
