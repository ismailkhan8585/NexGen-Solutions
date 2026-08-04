import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { ConsultationBooking } from '@/components/sections/consultation-booking';
import { industrySolutions } from '@/lib/industry-solutions';
import { localizedMetadata } from '@/lib/seo';
import type { PublicLocale } from '@/lib/business-config';

export async function generateMetadata(props: { params: Promise<{ locale: PublicLocale }> }) {
  const params = await props.params;
  const ar = params.locale === 'ar';return localizedMetadata(params.locale, 'industries', ar ? 'حلول رقمية للقطاعات' : 'Digital Solutions by Industry', ar ? 'حلول رقمية مدروسة لقطاعات الأعمال في السعودية، من المطاعم والتجزئة إلى الخدمات المهنية.' : 'Considered digital solutions for Saudi business sectors, from restaurants and retail to professional services.');
}
export default async function IndustriesPage(props: { params: Promise<{ locale: PublicLocale }> }) {
  const params = await props.params;
  const l = params.locale;const ar = l === 'ar';return <><Navbar/><main className="pt-[72px]"><header className="container-max px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"><p className="text-sm font-semibold text-brand-cyan-300">{ar ? 'خبرة تقنية تتكيف مع التشغيل' : 'Technology adapted to operations'}</p><h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold text-white sm:text-6xl">{ar ? 'حلول رقمية مبنية حول تحديات كل قطاع' : 'Digital solutions built around each industry’s challenges'}</h1><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-ink-secondary">{ar ? 'نبدأ بالعمليات والمستخدمين والمخاطر، ثم نختار التقنية والتكاملات المناسبة دون افتراضات أو ادعاءات امتثال غير موثقة.' : 'We begin with workflows, users, and risks, then select appropriate technology and integrations without unsupported assumptions or compliance claims.'}</p></header><section className="container-max px-4 pb-16 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{industrySolutions.map((item) => <Link key={item.slug} href={`/${l}/industries/${item.slug}`} className="group flex min-h-64 flex-col rounded-3xl border border-surface-border bg-surface-card p-6 transition hover:-translate-y-1 hover:border-brand-cyan-500/40"><p className="text-xs font-semibold text-brand-cyan-300">{item.eyebrow[l]}</p><h2 className="mt-4 font-display text-2xl font-semibold text-white">{item.title[l]}</h2><p className="mt-3 flex-1 text-sm leading-7 text-ink-secondary">{item.description[l]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan-300">{ar ? 'استكشف الحل' : 'Explore solution'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180"/></span></Link>)}</div></section><ConsultationBooking/></main><Footer/><FloatingWhatsApp/></>;
}
