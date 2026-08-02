import type { Metadata } from 'next';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { TechPill } from '@/components/ui/tech-pill';
import { GradientButton } from '@/components/ui/gradient-button';
import { Globe, Smartphone, Palette, ShoppingCart, Settings, BrainCircuit, TrendingUp, Cloud, ShieldCheck, Lightbulb, Rocket, Link2, ArrowRight } from 'lucide-react';

const iconMap: Record<string, typeof Globe> = {
  Globe, Smartphone, Palette, ShoppingCart, Settings, BrainCircuit, TrendingUp, Cloud, ShieldCheck, Lightbulb, Rocket, Link2,
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of digital services — from web development to AI and blockchain.',
};

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  await ensurePrismaConnection();
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="text-center mb-16">
              <GradientBadge className="mb-4">What We Do</GradientBadge>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                All Services
              </h1>
              <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
                Everything your business needs to dominate the digital world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] ?? Globe;
                const isPurple = i % 2 === 0;
                return (
                  <div
                    key={service.id}
                    className="group bg-surface-card border border-surface-border rounded-2xl p-6 transition-all hover:border-surface-borderHover hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isPurple ? 'bg-brand-purple-500/10' : 'bg-brand-cyan-500/10'}`}>
                      <Icon className={`w-6 h-6 ${isPurple ? 'text-brand-purple-400' : 'text-brand-cyan-400'}`} />
                    </div>
                    <h3 className="font-display font-semibold text-white text-xl mb-1">
                      {params.locale === 'ar' ? service.nameAr ?? service.nameEn : service.nameEn}
                    </h3>
                    <p className="text-ink-secondary text-sm mb-4 leading-relaxed">
                      {params.locale === 'ar' ? service.descriptionAr ?? service.descriptionEn : service.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.techStack.map((tech) => (
                        <TechPill key={tech}>{tech}</TechPill>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-muted text-sm">{service.startingPrice}</span>
                      <a href={`/${params.locale}/services/${service.slug}`}>
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isPurple ? 'text-brand-purple-400' : 'text-brand-cyan-400'}`}>
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
