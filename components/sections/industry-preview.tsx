import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, Building2, HeartPulse, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { industrySolutions } from '@/lib/industry-solutions';
import type { Locale } from '@/lib/i18n';

const selected = ['real-estate', 'restaurant-pos', 'healthcare', 'retail-ecommerce'] as const;
const icons = { 'real-estate': Building2, 'restaurant-pos': UtensilsCrossed, healthcare: HeartPulse, 'retail-ecommerce': ShoppingBag } as const;

export function IndustryPreview({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  const industries = selected.map((slug) => industrySolutions.find((item) => item.slug === slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section id="industries" className="section-padding border-y border-surface-border bg-surface-card/30">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <header className="grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div><p className="section-kicker">{ar ? 'حلول حسب القطاع' : 'Industry capabilities'}</p><h2 className="section-title mt-4">{ar ? 'فهم سياق العمل قبل اختيار التقنية' : 'Industry context before technology choices'}</h2></div>
          <p className="max-w-2xl text-base leading-7 text-ink-secondary lg:justify-self-end">{ar ? 'نستكشف التحديات والعمليات والتكاملات الفعلية لكل قطاع، ثم نحدد حلاً رقمياً مناسباً دون ادعاء خبرة أو تكامل غير موثق.' : 'We examine each sector’s real challenges, operations, and integrations before defining a suitable digital solution—without unsupported experience claims.'}</p>
        </header>
        <div className="mt-10 grid overflow-hidden rounded-3xl border border-surface-border bg-surface-border md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = icons[industry.slug as keyof typeof icons];
            return <Link key={industry.slug} href={`/${locale}/industries/${industry.slug}`} className="group bg-surface-card p-6 transition-colors hover:bg-surface-hover focus-visible:z-10 sm:p-7"><div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 text-brand-cyan-300"><Icon className="h-5 w-5" aria-hidden="true" /></span><Arrow className="h-4 w-4 text-ink-muted transition group-hover:text-brand-cyan-300" aria-hidden="true" /></div><h3 className="mt-5 font-display text-lg font-semibold text-white">{industry.title[locale]}</h3><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{ar ? 'التحدي' : 'Common challenge'}</p><p className="mt-1 text-sm leading-6 text-ink-secondary">{industry.challenges[0][locale]}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-primary">{industry.solution[locale]}</p></Link>;
          })}
        </div>
        <Link href={`/${locale}/industries`} className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-surface-border px-5 font-semibold text-white transition hover:border-brand-cyan-500/40 hover:bg-surface-card">{ar ? 'استعرض جميع القطاعات' : 'Explore all industries'}<Arrow className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
