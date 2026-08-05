import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, BrainCircuit, Globe, Palette, Settings, ShoppingCart, Smartphone } from 'lucide-react';
import { findService } from '@/lib/service-catalog';
import type { Locale } from '@/lib/i18n';

export interface ServiceData {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  icon: string;
  startingPrice: string | null;
  techStack: string[];
}

const priority = ['business-websites', 'ecommerce', 'mobile-apps', 'custom-software', 'ui-ux', 'ai-automation'] as const;
const icons = { 'business-websites': Globe, ecommerce: ShoppingCart, 'mobile-apps': Smartphone, 'custom-software': Settings, 'ui-ux': Palette, 'ai-automation': BrainCircuit } as const;
const serviceLabels = {
  'business-websites': { ar: 'تصميم وتطوير المواقع', en: 'Website Design and Development' },
  ecommerce: { ar: 'حلول التجارة الإلكترونية', en: 'E-commerce Solutions' },
  'mobile-apps': { ar: 'تطوير تطبيقات الجوال', en: 'Mobile App Development' },
  'custom-software': { ar: 'برمجيات الأعمال المخصصة', en: 'Custom Business Software' },
  'ui-ux': { ar: 'تصميم واجهات وتجربة المستخدم', en: 'UI/UX Design' },
  'ai-automation': { ar: 'الأتمتة والتكاملات', en: 'Automation and Integrations' },
} as const;

export function Services({ services, locale }: { services: ServiceData[]; locale: Locale }) {
  const ar = locale === 'ar';
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  const ordered = priority.map((slug) => services.find((service) => findService(service.slug)?.slug === slug)).filter((service): service is ServiceData => Boolean(service));
  const visible = (ordered.length >= 4 ? ordered : services).slice(0, 4);

  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <header className="grid gap-5 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div><p className="section-kicker">{ar ? 'خدماتنا الأساسية' : 'Core services'}</p><h2 className="section-title mt-4">{ar ? 'حلول رقمية مبنية حول أهداف عملك' : 'Digital solutions built around your business goals.'}</h2></div>
          <p className="max-w-2xl text-base leading-7 text-ink-secondary lg:justify-self-end">{ar ? 'نربط تجربة المستخدم والتقنية والتشغيل بنتيجة واضحة، مع نطاق يمكن مراجعته وتطويره.' : 'We connect user experience, technology, and operations to a clear outcome through a scope your team can review and evolve.'}</p>
        </header>

        {visible.length === 0 ? <div className="mt-12 rounded-3xl border border-dashed border-surface-border px-6 py-14 text-center text-sm text-ink-muted">{ar ? 'لا توجد خدمات منشورة حالياً.' : 'No services are currently published.'}</div> : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((service, index) => {
              const catalog = findService(service.slug);
              const canonicalSlug = catalog?.slug ?? service.slug;
              const Icon = icons[canonicalSlug as keyof typeof icons] ?? Globe;
              const name = serviceLabels[canonicalSlug as keyof typeof serviceLabels]?.[locale] ?? catalog?.name[locale] ?? (ar ? service.nameAr || service.nameEn : service.nameEn);
              const description = catalog?.summary[locale] ?? (ar ? service.descriptionAr : service.descriptionEn);
              const capabilities = catalog?.features[locale].slice(0, index === 0 ? 3 : 2) ?? [];
              const featured = index === 0;
              return (
                <article key={service.id} className={`group relative overflow-hidden rounded-3xl border border-surface-border bg-surface-card transition duration-300 hover:-translate-y-1 hover:border-brand-cyan-500/30 ${featured ? 'md:col-span-2 lg:row-span-2 lg:min-h-[420px]' : 'min-h-[240px]'}`}>
                  <Link href={`/${locale}/services/${service.slug}`} className="flex h-full flex-col p-6 focus-visible:outline-none sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-4"><span className={`flex items-center justify-center rounded-2xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 text-brand-cyan-300 ${featured ? 'h-14 w-14' : 'h-11 w-11'}`}><Icon className={featured ? 'h-7 w-7' : 'h-5 w-5'} aria-hidden="true" /></span><Arrow className="h-4 w-4 text-ink-muted transition group-hover:text-brand-cyan-300" aria-hidden="true" /></div>
                    <div className={featured ? 'mt-auto pt-16' : 'mt-8'}><p className="text-xs font-semibold uppercase tracking-[.16em] text-ink-muted">{String(index + 1).padStart(2, '0')}</p><h3 className={`mt-3 font-display font-semibold text-white ${featured ? 'max-w-2xl text-3xl sm:text-4xl' : 'text-xl'}`}>{name}</h3><p className={`mt-3 leading-7 text-ink-secondary ${featured ? 'max-w-2xl text-base sm:text-lg' : 'text-sm'}`}>{description}</p>{capabilities.length > 0 && <ul className={`mt-6 flex flex-wrap gap-2 ${featured ? '' : 'mt-auto pt-5'}`}>{capabilities.map((capability) => <li key={capability} className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-ink-secondary">{capability}</li>)}</ul>}<span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan-300">{ar ? 'اعرف المزيد' : 'Learn more'}<Arrow className="h-4 w-4" /></span></div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
        <Link href={`/${locale}/services`} className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-surface-border px-5 font-semibold text-white transition hover:border-brand-cyan-500/40 hover:bg-surface-card">{ar ? 'استعرض جميع الخدمات' : 'View all services'}<Arrow className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
