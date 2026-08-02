'use client';

import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';

export function Hero() {
  const { t, locale } = useI18n();
  const Arrow = locale === 'ar' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="relative isolate overflow-hidden border-b border-surface-border bg-surface pt-[72px]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.10),transparent_30%)]" />
      <div className="container-max grid min-h-[760px] items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan-500/25 bg-brand-cyan-500/5 px-4 py-2 text-sm font-medium text-brand-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan-400" aria-hidden="true" />
            {t('hero.badge')}
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">{t('hero.title_1')}</span>
            <span className="block text-brand-cyan-300">{t('hero.title_2')}</span>
            <span className="block text-ink-secondary">{t('hero.title_3')}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-ink-secondary sm:text-lg">{t('hero.desc')}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/${locale}#contact`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-surface transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-400">
              {t('hero.cta_project')} <Arrow className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}#work`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-surface-border bg-surface-card px-6 py-3 font-semibold text-white transition hover:border-surface-borderHover hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-400">
              {t('hero.cta_work')}
            </Link>
            <WhatsAppButton label={t('hero.cta_whatsapp')} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="rounded-[2rem] border border-white/10 bg-surface-card/90 p-5 shadow-2xl shadow-black/30 sm:p-7">
            <div className="mb-6 flex items-center justify-between border-b border-surface-border pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">NexGen</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">{locale === 'ar' ? 'منتج رقمي متكامل' : 'A complete digital product'}</p>
              </div>
              <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-gold-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" /></div>
            </div>
            <div className="space-y-3">
              {[
                locale === 'ar' ? 'تجربة عربية RTL أصيلة' : 'Native Arabic RTL experience',
                locale === 'ar' ? 'أداء وإتاحة وأمان' : 'Performance, accessibility, and security',
                locale === 'ar' ? 'بنية قابلة للتوسع والتكامل' : 'Scalable, integration-ready architecture',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface px-4 py-3.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-cyan-400" aria-hidden="true" /><span className="text-sm font-medium text-ink-primary">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3" aria-hidden="true"><div className="h-24 rounded-xl border border-surface-border bg-[linear-gradient(135deg,rgba(34,211,238,0.12),transparent)]" /><div className="h-24 rounded-xl border border-surface-border bg-[linear-gradient(135deg,rgba(139,92,246,0.12),transparent)]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
