'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientText } from '@/components/ui/gradient-text';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { Search, ClipboardList, Palette, Code, TestTube, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  { icon: Search, key: 'discover' },
  { icon: ClipboardList, key: 'plan' },
  { icon: Palette, key: 'design' },
  { icon: Code, key: 'develop' },
  { icon: TestTube, key: 'test' },
  { icon: Rocket, key: 'launch' },
  { icon: HeartHandshake, key: 'support' },
];

export function Process() {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-surface-hover/50 relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('process.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('process.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-brand-purple-500 via-brand-cyan-500 to-brand-purple-500 opacity-30" />

          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-2">
            {steps.map((step, i) => (
              <StaggerItem key={step.key}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full bg-surface-card border-2 border-brand-purple-500/30 flex items-center justify-center mb-4 transition-all hover:border-brand-cyan-500/50 hover:shadow-lg hover:shadow-brand-purple-500/20">
                    <step.icon className="w-7 h-7 text-brand-purple-400" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 flex items-center justify-center text-white text-xs font-bold font-mono">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-base mb-1">
                    {t(`process.${step.key}`)}
                  </h3>
                  <p className="text-ink-secondary text-xs leading-relaxed max-w-[140px]">
                    {t(`process.${step.key}_desc`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}
