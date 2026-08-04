import type { Locale } from '@/lib/i18n';
import { serverTranslate } from '@/lib/server-translations';

const steps = ['discover', 'plan', 'design', 'develop', 'launch'] as const;

export function Process({ locale }: { locale: Locale }) {
  const t = (key: string) => serverTranslate(locale, key);
  const ar = locale === 'ar';
  return (
    <section className="section-padding border-y border-surface-border bg-surface-card/30">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center"><p className="section-kicker">{t('process.badge')}</p><h2 className="section-title mx-auto mt-4">{ar ? 'مسار واضح من الفكرة إلى الإطلاق' : 'A clear path from idea to launch'}</h2><p className="mt-5 text-base leading-7 text-ink-secondary">{t('process.subtitle')}</p></header>
        <ol className="relative mx-auto mt-14 max-w-6xl lg:grid lg:grid-cols-5 lg:gap-5">
          <span className="absolute inset-x-[10%] top-5 hidden h-px bg-surface-border lg:block" aria-hidden="true" />
          {steps.map((step, index) => <li key={step} className="relative grid grid-cols-[44px_1fr] gap-4 pb-9 last:pb-0 lg:block lg:pb-0 lg:text-center"><span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brand-cyan-500/30 bg-surface font-mono text-xs font-semibold text-brand-cyan-300 lg:mx-auto">{String(index + 1).padStart(2, '0')}</span><span className={`absolute bottom-0 start-[21px] top-11 w-px bg-surface-border lg:hidden ${index === steps.length - 1 ? 'hidden' : ''}`} aria-hidden="true"/><div className="pt-1 lg:pt-6"><h3 className="font-display text-lg font-semibold text-white">{t(`process.${step}`)}</h3><p className="mt-2 text-sm leading-6 text-ink-secondary">{t(`process.${step}_desc`)}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
