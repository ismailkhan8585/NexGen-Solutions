import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { businessConfig } from '@/lib/business-config';
import type { Locale } from '@/lib/i18n';
import { serverTranslate } from '@/lib/server-translations';

export function FinalCta({ locale }: { locale: Locale }) {
  const t = (key: string) => serverTranslate(locale, key);
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
      <div className="container-max relative overflow-hidden rounded-[2rem] border border-brand-cyan-500/20 bg-[#0d1417] px-6 py-12 shadow-[0_30px_80px_-50px_rgba(34,211,238,.35)] sm:px-10 sm:py-16 lg:px-16">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_85%_15%,rgba(34,211,238,.11),transparent_34%)]" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl"><p className="section-kicker">{ar ? 'ابدأ بخطوة واضحة' : 'Start with a clear next step'}</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{ar ? 'هل أنت مستعد لبناء منتجك الرقمي القادم؟' : 'Ready to build your next digital product?'}</h2><p className="mt-5 max-w-2xl text-base leading-7 text-ink-secondary sm:text-lg">{ar ? 'شاركنا أهدافك، وسنقترح نهجاً مناسباً لطبيعة عملك ومتطلبات المشروع.' : 'Tell us about your goals, and we’ll recommend the right approach for your business.'}</p><p className="mt-5 flex items-start gap-2 text-sm text-ink-muted"><Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{businessConfig.workingHours[locale] || t('contact.responseTime')} · {ar ? 'توقيت الرياض' : 'Riyadh time'}</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href={`/${locale}/contact`} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-surface transition hover:bg-cyan-50">{ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}<Arrow className="h-4 w-4" /></Link><WhatsAppButton className="min-h-[50px] justify-center" label={ar ? 'تواصل معنا عبر واتساب' : 'Contact Us on WhatsApp'} /></div>
        </div>
      </div>
    </section>
  );
}
