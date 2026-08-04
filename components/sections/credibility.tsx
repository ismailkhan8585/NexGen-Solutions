import { Languages, LifeBuoy, Route, ShieldCheck } from 'lucide-react';
import { credibilityConfig } from '@/lib/credibility';
import type { Locale } from '@/lib/i18n';

const icons = { bilingual: Languages, milestones: Route, engineering: ShieldCheck, support: LifeBuoy } as const;

export function Credibility({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="credibility-title" className="border-b border-surface-border bg-surface-card/45 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="container-max">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-cyan-300">{credibilityConfig.eyebrow[locale]}</p>
          <h2 id="credibility-title" className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">{credibilityConfig.title[locale]}</h2>
        </header>
        <div className="mt-9 grid border-y border-surface-border sm:grid-cols-2 lg:grid-cols-4">
          {credibilityConfig.items.map((item, index) => {
            const Icon = icons[item.key];
            return (
              <article key={item.key} className={`py-6 sm:px-6 lg:py-8 ${index > 0 ? 'border-t border-surface-border sm:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-s' : ''} ${index > 1 ? 'sm:border-t lg:border-t-0' : ''} ${index > 0 ? 'lg:border-s' : ''}`}>
                <Icon className="h-5 w-5 text-brand-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-semibold text-white">{item.title[locale]}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-secondary">{item.description[locale]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
