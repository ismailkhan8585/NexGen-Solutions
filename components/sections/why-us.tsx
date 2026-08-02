'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GlassCard } from '@/components/ui/glass-card';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { Zap, Trophy, Globe, RefreshCw, ShieldCheck, TrendingUp } from 'lucide-react';

const features = [
  { icon: Zap, key: 'fast', color: 'text-brand-purple-400' },
  { icon: Trophy, key: 'quality', color: 'text-brand-cyan-400' },
  { icon: Globe, key: 'global', color: 'text-brand-purple-400' },
  { icon: RefreshCw, key: 'agile', color: 'text-brand-cyan-400' },
  { icon: ShieldCheck, key: 'support', color: 'text-brand-purple-400' },
  { icon: TrendingUp, key: 'roi', color: 'text-brand-cyan-400' },
];

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-surface-hover/50 relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('whyus.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('whyus.title')}
          </h2>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.key}>
              <GlassCard className="p-6 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {t(`whyus.${feature.key}_title`)}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  {t(`whyus.${feature.key}_desc`)}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
