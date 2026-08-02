import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { serviceCatalog } from '@/lib/service-catalog';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const ar = params.locale === 'ar';
  return { title: ar ? 'الخدمات الرقمية' : 'Digital Services', description: ar ? 'خدمات تطوير وتصميم وأتمتة للأعمال في السعودية.' : 'Development, design, and automation services for businesses across Saudi Arabia.' };
}

export default function ServicesPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const locale = params.locale;
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  return <><Navbar /><main className="pt-[72px]"><section className="section-padding bg-surface"><div className="container-max px-4 sm:px-6 lg:px-8">
    <header className="mx-auto mb-14 max-w-3xl text-center"><p className="text-sm font-semibold text-brand-cyan-300">{locale === 'ar' ? 'خدماتنا' : 'Our services'}</p><h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">{locale === 'ar' ? 'حلول رقمية تخدم أهداف العمل' : 'Digital solutions shaped around business goals'}</h1><p className="mt-5 text-lg leading-8 text-ink-secondary">{locale === 'ar' ? 'نحدد التقنية والنطاق بعد فهم المستخدم والعملية والنتيجة المطلوبة.' : 'Technology and scope are selected after understanding the user, operation, and intended outcome.'}</p></header>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{serviceCatalog.map((service) => <article key={service.slug} className="flex flex-col rounded-2xl border border-surface-border bg-surface-card p-6"><h2 className="font-display text-xl font-semibold text-white">{service.name[locale]}</h2><p className="mt-3 flex-1 text-sm leading-6 text-ink-secondary">{service.summary[locale]}</p><ul className="mt-5 space-y-2">{service.features[locale].slice(0, 3).map((feature) => <li key={feature} className="flex gap-2 text-sm text-ink-secondary"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan-400" />{feature}</li>)}</ul><Link href={`/${locale}/services/${service.slug}`} className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-cyan-300 hover:text-brand-cyan-200">{locale === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}<Arrow className="h-4 w-4" /></Link></article>)}</div>
  </div></section></main><Footer /><FloatingWhatsApp /></>;
}
