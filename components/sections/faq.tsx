import { ChevronDown } from 'lucide-react';
import { GradientBadge } from '@/components/ui/gradient-badge';
import type { Locale } from '@/lib/i18n';
import { serverTranslate } from '@/lib/server-translations';

type ManagedFaq = {
  id: string;
  questionEn: string;
  questionAr: string | null;
  answerEn: string;
  answerAr: string | null;
};

export function FAQ({ items = [], locale, limit = 8 }: { items?: ManagedFaq[]; locale: Locale; limit?: number }) {
  const t = (key: string) => serverTranslate(locale, key);
  const translatedFallback = Array.from({ length: 8 }, (_, index) => ({
    q: t(`faq.q${index + 1}`),
    a: t(`faq.a${index + 1}`),
  }));
  const managed = items.flatMap((item) => {
    const q = locale === 'ar' ? item.questionAr : item.questionEn;
    const a = locale === 'ar' ? item.answerAr : item.answerEn;
    return q && a ? [{ q, a }] : [];
  });
  const faqs = (managed.length ? managed : translatedFallback).slice(0, limit);

  return (
    <section className="section-padding relative bg-surface">
      <div className="container-max relative z-10">
        <div className="mb-10 text-center">
          <GradientBadge className="mb-4">{t('faq.badge')}</GradientBadge>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('faq.title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-secondary">{t('faq.subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <details key={faq.q} open={index === 0} className="group overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-cyan-400 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-base font-medium text-white">{faq.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-ink-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-secondary">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
