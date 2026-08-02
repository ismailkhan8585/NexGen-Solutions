'use client';

import { useI18n } from '@/components/i18n-provider';
import { CountUp } from '@/components/animations/count-up';
import { FadeIn } from '@/components/animations/fade-in';
import type { SiteStats } from './hero';

export function StatsCounter({ stats: siteStats }: { stats: SiteStats }) {
  const { t } = useI18n();
  const stats = [
    { value: siteStats.totalProjects, suffix: '+', label: t('stats.projects'), color: 'from-brand-purple-400 to-brand-purple-600' },
    { value: siteStats.totalClients, suffix: '+', label: t('stats.clients'), color: 'from-brand-cyan-400 to-brand-cyan-600' },
    { value: siteStats.totalCountries, suffix: '+', label: t('stats.countries'), color: 'from-emerald-400 to-emerald-500' },
    { value: siteStats.yearsExperience, suffix: '+', label: t('stats.years'), color: 'from-gold-400 to-gold-500' },
  ];

  return (
    <section className="relative py-20 border-y border-surface-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/20 via-surface to-brand-cyan-900/20" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            {t('stats.title')}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className={`font-mono font-bold text-4xl sm:text-5xl lg:text-6xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-ink-secondary text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
