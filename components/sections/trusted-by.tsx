'use client';

import { useI18n } from '@/components/i18n-provider';

const logos = [
  'Vercel', 'Stripe', 'AWS', 'Docker', 'Figma', 'Supabase', 'OpenAI', 'Linear', 'Notion', 'GitHub',
];

export function TrustedBy() {
  const { t } = useI18n();

  return (
    <section className="border-y border-surface-border bg-surface py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <p className="text-center text-ink-muted text-sm mb-8">
          {t('trusted.title')}
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center gap-2 text-ink-muted hover:text-white transition-colors opacity-50 hover:opacity-100"
              >
                <span className="font-display font-bold text-xl whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
