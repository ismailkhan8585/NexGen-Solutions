'use client';

import { CreditCard, Languages, MapPinned, Workflow } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';

export function SaudiMarket() {
  const { t } = useI18n();
  const capabilities = [
    { icon: Languages, title: t('saudi.bilingual'), description: t('saudi.bilingualDesc') },
    { icon: CreditCard, title: t('saudi.payments'), description: t('saudi.paymentsDesc') },
    { icon: Workflow, title: t('saudi.operations'), description: t('saudi.operationsDesc') },
  ];

  return (
    <section id="about" className="section-padding border-y border-surface-border bg-surface-card/40">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold text-brand-cyan-300">{t('saudi.badge')}</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{t('saudi.title')}</h2>
            <p className="mt-5 max-w-xl leading-7 text-ink-secondary">{t('saudi.description')}</p>
            <div className="mt-7 rounded-2xl border border-surface-border bg-surface p-5">
              <div className="flex items-start gap-3"><MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan-400" aria-hidden="true" /><div><p className="text-sm leading-6 text-ink-primary">{t('saudi.coverage')}</p><p className="mt-2 text-xs leading-5 text-ink-muted">{t('saudi.coverageNote')}</p></div></div>
            </div>
          </div>
          <div className="grid gap-4">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-surface-border bg-surface p-5 sm:p-6">
                <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan-500/10 text-brand-cyan-300"><Icon className="h-5 w-5" aria-hidden="true" /></div><div><h3 className="font-display text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-secondary">{description}</p></div></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
