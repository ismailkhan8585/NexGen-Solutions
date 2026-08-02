'use client';

import { useI18n } from '@/components/i18n-provider';
import Link from 'next/link';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientText } from '@/components/ui/gradient-text';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import {
  Globe, Smartphone, Palette, ShoppingCart, Settings, BrainCircuit,
  TrendingUp, Cloud, ShieldCheck, Lightbulb, Rocket, Link2,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, typeof Globe> = {
  Globe, Smartphone, Palette, ShoppingCart, Settings, BrainCircuit,
  TrendingUp, Cloud, ShieldCheck, Lightbulb, Rocket, Link2,
};

export interface ServiceData {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  icon: string;
  startingPrice: string | null;
  techStack: string[];
}

export function Services({ services }: { services: ServiceData[] }) {
  const { t, locale } = useI18n();

  return (
    <section id="services" className="section-padding bg-surface relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('services.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 && (
            <div className="col-span-full text-center py-16 text-ink-muted text-sm">
              {t('common.empty')}
            </div>
          )}
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe;
            const isPurple = i % 2 === 0;
            return (
              <StaggerItem key={service.id}>
                <div
                  className="group relative bg-surface-card border border-surface-border rounded-2xl p-6 transition-all duration-300 hover:border-surface-borderHover hover:bg-surface-hover hover:-translate-y-1"
                  style={{ boxShadow: 'none' }}
                >
                  <div
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                    style={{
                      background: isPurple
                        ? 'linear-gradient(to bottom, rgb(139 92 246), rgb(124 58 237))'
                        : 'linear-gradient(to bottom, rgb(6 182 212), rgb(8 145 178))',
                    }}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isPurple
                        ? 'bg-brand-purple-500/10'
                        : 'bg-brand-cyan-500/10'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isPurple ? 'text-brand-purple-400' : 'text-brand-cyan-400'
                      }`}
                    />
                  </div>
                  <h3 className="font-display font-semibold text-white text-xl mb-1">
                    {locale === 'ar' ? service.nameAr ?? service.nameEn : service.nameEn}
                  </h3>
                  <p className="text-ink-secondary text-sm mb-4 leading-relaxed">
                    {locale === 'ar'
                      ? service.descriptionAr ?? service.descriptionEn
                      : service.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-ink-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted text-sm">
                      {service.techStack.length > 0
                        ? `${service.techStack.length} ${locale === 'ar' ? 'تقنيات' : 'technologies'}`
                        : ''}
                    </span>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                        isPurple
                          ? 'text-brand-purple-400 hover:text-brand-purple-300'
                          : 'text-brand-cyan-400 hover:text-brand-cyan-300'
                      }`}
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>


        <div className="text-center mt-12">
          <Link href={`/${locale}/services`}>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg hover:shadow-brand-purple-500/30 transition-all">
              {t('services.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
