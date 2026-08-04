import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { serverTranslate } from '@/lib/server-translations';

export function Hero({ locale }: { locale: Locale }) {
  const t = (key: string) => serverTranslate(locale, key);
  const Arrow = locale === 'ar' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="relative isolate overflow-hidden border-b border-surface-border bg-surface pt-[72px]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(16,185,129,0.06),transparent_28%)]" />
      <div className="grid-pattern absolute inset-0 -z-10 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="container-max grid min-h-[760px] min-w-0 items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
        <div className="hero-reveal min-w-0 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan-500/25 bg-brand-cyan-500/5 px-4 py-2 text-sm font-medium text-brand-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan-400" aria-hidden="true" />
            {t('hero.badge')}
          </div>
          <h1 className="max-w-4xl break-words font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">{t('hero.headline')}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-ink-secondary sm:text-lg">{t('hero.desc')}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/${locale}#contact`} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-surface transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-400">
              {t('hero.cta_project')} <Arrow className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}#work`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-surface-border bg-surface-card px-6 py-3 font-semibold text-white transition hover:border-surface-borderHover hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-400">
              {t('hero.cta_work')}
            </Link>
          </div>
          <ul className="mt-7 flex flex-col gap-3 text-sm text-ink-secondary sm:flex-row sm:flex-wrap sm:gap-x-6" aria-label={locale === 'ar' ? 'مزايا العمل معنا' : 'Working with us'}>
            {['trust_bilingual', 'trust_updates', 'trust_support'].map((key) => (
              <li key={key} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-cyan-400" aria-hidden="true" />{t(`hero.${key}`)}</li>
            ))}
          </ul>
        </div>

        <div className="hero-reveal-delayed relative mx-auto w-full min-w-0 max-w-xl lg:mx-0">
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1012] p-4 shadow-[0_36px_100px_-48px_rgba(0,0,0,.9)] sm:p-5">
            <div className="flex items-center justify-between border-b border-surface-border px-1 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">NexGen Workspace</p>
                <p className="mt-1 text-sm font-semibold text-white">{locale === 'ar' ? 'نظام تسليم المنتج' : 'Digital product delivery system'}</p>
              </div>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">{locale === 'ar' ? 'منهج واضح' : 'Clear workflow'}</span>
            </div>
            <div className="mt-4 rounded-2xl border border-surface-border bg-surface p-4 sm:p-5">
              <div className="flex items-center justify-between"><p className="text-xs font-semibold text-white">{locale === 'ar' ? 'تجربة ثنائية اللغة' : 'Bilingual experience'}</p><span className="text-[10px] text-ink-muted">RTL / LTR</span></div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div dir="rtl" className="rounded-xl border border-brand-cyan-500/15 bg-brand-cyan-500/[.04] p-3"><p className="text-xs font-semibold text-white">العربية</p><div className="mt-3 space-y-2" aria-hidden="true"><span className="block h-2 w-full rounded bg-white/10"/><span className="block h-2 w-4/5 rounded bg-white/[.06]"/><span className="block h-8 w-2/3 rounded-lg bg-brand-cyan-500/15"/></div></div>
                <div dir="ltr" className="rounded-xl border border-surface-border bg-surface-card p-3"><p className="text-xs font-semibold text-white">English</p><div className="mt-3 space-y-2" aria-hidden="true"><span className="block h-2 w-full rounded bg-white/10"/><span className="block h-2 w-4/5 rounded bg-white/[.06]"/><span className="block h-8 w-2/3 rounded-lg bg-white/10"/></div></div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2" aria-label={locale === 'ar' ? 'مراحل العمل' : 'Delivery stages'}>{(locale === 'ar' ? ['اكتشاف','تصميم','تطوير','إطلاق'] : ['Discover','Design','Build','Launch']).map((stage,index)=><div key={stage} className={`rounded-xl border px-2 py-3 text-center text-[10px] font-medium ${index === 2 ? 'border-brand-cyan-500/30 bg-brand-cyan-500/10 text-brand-cyan-300' : 'border-surface-border bg-surface text-ink-muted'}`}><span className="mx-auto mb-2 block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true"/>{stage}</div>)}</div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">{(locale === 'ar' ? ['أداء وإتاحة','بنية قابلة للتوسع','تكاملات مدروسة'] : ['Performance & access','Scalable architecture','Considered integrations']).map(item=><div key={item} className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface px-3 py-2.5"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true"/><span className="text-[11px] text-ink-secondary">{item}</span></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
