'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientButton } from '@/components/ui/gradient-button';
import { FadeIn } from '@/components/animations/fade-in';

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/50 via-surface to-brand-cyan-900/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500" />

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact">
              <GradientButton className="px-8 py-4 text-base shadow-lg shadow-brand-purple-500/30">
                {t('cta.getQuote')}
              </GradientButton>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-surface-borderHover bg-surface-card px-8 py-4 font-semibold text-ink-primary hover:bg-surface-hover transition-all active:scale-95"
            >
              {t('cta.scheduleCall')}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
