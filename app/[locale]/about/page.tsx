import type { Metadata } from 'next';
import Link from 'next/link';
import { Accessibility, Languages, ShieldCheck, Workflow } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { businessConfig } from '@/lib/business-config';

export function generateMetadata({ params }: { params: { locale: 'ar' | 'en' } }): Metadata {
  return params.locale === 'ar'
    ? { title: 'من نحن', description: 'تعرف على منهج نيكس جين سولوشنز في تصميم وتطوير المنتجات الرقمية للأعمال في السعودية.' }
    : { title: 'About Us', description: 'Learn how NexGen Solutions approaches digital product design and development for Saudi businesses.' };
}

export default function AboutPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const locale = params.locale;
  const ar = locale === 'ar';
  const values = ar ? [
    { icon: Languages, title: 'العربية أولاً', text: 'نصمم تجربة RTL من البداية مع تجربة إنجليزية LTR متكاملة عند الحاجة.' },
    { icon: Workflow, title: 'وضوح التنفيذ', text: 'نربط النطاق والمراحل والمراجعات بهدف واضح لكل قرار.' },
    { icon: Accessibility, title: 'جودة قابلة للاستخدام', text: 'نراعي الأداء وسهولة الوصول والاستجابة عبر الشاشات.' },
    { icon: ShieldCheck, title: 'ملكية واستدامة', text: 'نبني حلولاً قابلة للصيانة ونوثق القرارات المهمة للفريق.' },
  ] : [
    { icon: Languages, title: 'Arabic first', text: 'We design RTL from the beginning, with a complete English LTR experience when needed.' },
    { icon: Workflow, title: 'Delivery clarity', text: 'Scope, milestones, and reviews connect every decision to a defined goal.' },
    { icon: Accessibility, title: 'Usable quality', text: 'Performance, accessibility, and responsive behavior are considered throughout.' },
    { icon: ShieldCheck, title: 'Ownership and longevity', text: 'Solutions are maintainable, with important decisions documented for the team.' },
  ];

  return <><Navbar /><main className="pt-[72px]"><section className="section-padding bg-surface"><div className="container-max max-w-5xl px-4 sm:px-6 lg:px-8">
    <header className="max-w-3xl"><p className="text-sm font-semibold text-brand-cyan-300">{ar ? 'من نحن' : 'About us'}</p><h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{ar ? 'نبني منتجات رقمية واضحة للأعمال في السعودية' : 'We build clear digital products for businesses in Saudi Arabia'}</h1><p className="mt-6 text-lg leading-8 text-ink-secondary">{ar ? 'نيكس جين سولوشنز شركة حلول رقمية تعمل على المواقع والتطبيقات والتجارة الإلكترونية والبرمجيات المخصصة. نبدأ بفهم العملية والمستخدم قبل اختيار التقنية.' : 'NexGen Solutions works across websites, applications, e-commerce, and custom software. We begin by understanding the operation and user before selecting technology.'}</p></header>
    <div className="mt-14 grid gap-6 md:grid-cols-2"><section className="rounded-2xl border border-surface-border bg-surface-card p-7"><h2 className="font-display text-2xl font-semibold text-white">{ar ? 'مهمتنا' : 'Our mission'}</h2><p className="mt-4 leading-7 text-ink-secondary">{ar ? 'مساعدة الأعمال على تحويل الخدمات والعمليات إلى تجارب رقمية عربية سهلة الاستخدام وقابلة للتطوير.' : 'Help businesses turn services and operations into usable, Arabic-first digital experiences that can evolve.'}</p></section><section className="rounded-2xl border border-surface-border bg-surface-card p-7"><h2 className="font-display text-2xl font-semibold text-white">{ar ? 'طريقة عملنا' : 'How we work'}</h2><p className="mt-4 leading-7 text-ink-secondary">{ar ? 'نحدد النطاق والأولويات والمخاطر، ثم نصمم ونطور ونختبر ضمن مراحل قابلة للمراجعة.' : 'We define scope, priorities, and risks, then design, build, and test through reviewable milestones.'}</p></section></div>
    <section className="mt-14"><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'مبادئ التنفيذ' : 'Delivery principles'}</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-surface-border bg-surface-card p-6"><Icon className="h-6 w-6 text-brand-cyan-400" /><h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-secondary">{text}</p></article>)}</div></section>
    <section className="mt-14 rounded-3xl border border-surface-border bg-surface-card p-7 sm:p-10"><h2 className="font-display text-2xl font-semibold text-white">{ar ? 'نطاق الخدمة في المملكة' : 'Service coverage in the Kingdom'}</h2><p className="mt-4 leading-7 text-ink-secondary">{ar ? `نقدم خدماتنا للأعمال في ${businessConfig.supportedCities.ar.join('، ')} وجميع مناطق المملكة. هذا نطاق خدمة ولا يعني وجود مكاتب فعلية في هذه المدن.` : `We serve businesses in ${businessConfig.supportedCities.en.join(', ')}, and across Saudi Arabia. This is service coverage and does not imply physical offices in these cities.`}</p><Link href={`/${locale}/contact`} className="mt-6 inline-flex min-h-[48px] items-center rounded-xl bg-white px-6 py-3 font-semibold text-surface">{ar ? 'ناقش مشروعك معنا' : 'Discuss your project'}</Link></section>
  </div></section></main><Footer /><FloatingWhatsApp /></>;
}
