import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { deliveryProcess, findService, serviceFaqs } from '@/lib/service-catalog';
import { localizedMetadata } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const params = await props.params;
  const service = findService(params.slug);
  return service ? localizedMetadata(params.locale, `services/${service.slug}`, service.name[params.locale], service.summary[params.locale]) : {};
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string; locale: 'ar' | 'en' }> }) {
  const params = await props.params;
  const service = findService(params.slug);
  if (!service) notFound();
  const locale = params.locale;
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const sectionTitles = locale === 'ar'
    ? { problems: 'المشكلات التي نعالجها', features: 'المزايا الرئيسية', process: 'طريقة التنفيذ', tech: 'تقنيات مناسبة للخدمة', uses: 'استخدامات في السوق السعودي', faq: 'أسئلة شائعة', cta: 'لنناقش احتياج مشروعك', ctaText: 'ابدأ باستشارة تساعد على تحديد النطاق والخطوة التالية.', button: 'اطلب استشارة', back: 'جميع الخدمات' }
    : { problems: 'Problems this service addresses', features: 'Key features', process: 'Delivery process', tech: 'Relevant technologies', uses: 'Saudi business use cases', faq: 'Frequently asked questions', cta: 'Let’s discuss your project needs', ctaText: 'Start with a consultation to define scope and the next practical step.', button: 'Request a consultation', back: 'All services' };
  return <><Navbar /><main className="pt-[72px]"><section className="section-padding bg-surface"><div className="container-max max-w-5xl px-4 sm:px-6 lg:px-8">
    <Link href={`/${locale}/services`} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-secondary hover:text-white"><Arrow className="h-4 w-4 rotate-180" />{sectionTitles.back}</Link>
    <header className="mt-8 max-w-3xl"><p className="text-sm font-semibold text-brand-cyan-300">{locale === 'ar' ? 'خدمة رقمية' : 'Digital service'}</p><h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{service.name[locale]}</h1><p className="mt-5 text-lg leading-8 text-ink-secondary">{service.value[locale]}</p></header>
    <div className="mt-14 grid gap-6 md:grid-cols-2">{[[sectionTitles.problems, service.problems[locale]], [sectionTitles.features, service.features[locale]]].map(([title, items]) => <section key={title as string} className="rounded-2xl border border-surface-border bg-surface-card p-6"><h2 className="font-display text-xl font-semibold text-white">{title}</h2><ul className="mt-5 space-y-3">{(items as readonly string[]).map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-ink-secondary"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan-400" />{item}</li>)}</ul></section>)}</div>
    <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-white">{sectionTitles.process}</h2><ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{deliveryProcess[locale].map((step, index) => <li key={step} className="rounded-xl border border-surface-border bg-surface-card p-5"><span className="font-mono text-sm text-brand-cyan-300">{String(index + 1).padStart(2, '0')}</span><p className="mt-2 text-sm font-medium text-white">{step}</p></li>)}</ol></section>
    <div className="mt-14 grid gap-8 md:grid-cols-2"><section><h2 className="font-display text-2xl font-semibold text-white">{sectionTitles.tech}</h2><div className="mt-5 flex flex-wrap gap-2">{service.technologies.map((tech) => <span key={tech} className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-ink-secondary">{tech}</span>)}</div></section><section><h2 className="font-display text-2xl font-semibold text-white">{sectionTitles.uses}</h2><ul className="mt-5 space-y-3">{service.useCases[locale].map((item) => <li key={item} className="flex gap-3 text-sm text-ink-secondary"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-cyan-400" />{item}</li>)}</ul></section></div>
    <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-white">{sectionTitles.faq}</h2><div className="mt-5 divide-y divide-surface-border rounded-2xl border border-surface-border bg-surface-card">{serviceFaqs[locale].map((faq) => <details key={faq.question} className="group p-5"><summary className="cursor-pointer list-none font-semibold text-white">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-ink-secondary">{faq.answer}</p></details>)}</div></section>
    <section className="mt-14 rounded-3xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 p-7 text-center sm:p-10"><h2 className="font-display text-2xl font-semibold text-white">{sectionTitles.cta}</h2><p className="mx-auto mt-3 max-w-xl text-ink-secondary">{sectionTitles.ctaText}</p><Link href={`/${locale}/contact`} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-surface">{sectionTitles.button}<Arrow className="h-4 w-4" /></Link></section>
  </div></section></main><Footer /><FloatingWhatsApp /></>;
}
