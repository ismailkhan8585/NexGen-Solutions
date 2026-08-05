import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Plug, Workflow } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { ConsultationBooking } from '@/components/sections/consultation-booking';
import { businessConfig, type PublicLocale } from '@/lib/business-config';
import { getIndustrySolution, industrySolutions } from '@/lib/industry-solutions';
import { JsonLd, localizedMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

export const revalidate = 300;
export async function generateMetadata(props: { params: Promise<{ locale: PublicLocale; slug: string }> }) {
  const params = await props.params;
  const page = getIndustrySolution(params.slug);if (!page) return {};
  return localizedMetadata(params.locale, `industries/${page.slug}`, page.title[params.locale], page.description[params.locale]);
}

async function relevantCaseStudy(keyword: string, category: string) {
  try {
    return await prisma.project.findFirst({ where: { isActive: true, isVerified: true, classification: 'CLIENT', OR: [{ industryEn: { contains: keyword, mode: 'insensitive' } }, { category: category as never }] }, select: { slug: true, titleEn: true, titleAr: true, descriptionEn: true, descriptionAr: true } });
  } catch { return null; }
}

export default async function IndustryPage(props: { params: Promise<{ locale: PublicLocale; slug: string }> }) {
  const params = await props.params;
  const page = getIndustrySolution(params.slug);if (!page) notFound();
  const locale = params.locale;const ar = locale === 'ar';
  const caseStudy = await relevantCaseStudy(page.industryKeyword, page.projectCategory);
  const url = `${businessConfig.appUrl.replace(/\/$/, '')}/${locale}/industries/${page.slug}`;
  const process = ar ? ['اكتشاف العمليات والمستخدمين والمخاطر', 'تحديد النطاق والتكاملات ومعايير القبول', 'تصميم النموذج الأولي ومراجعته', 'تطوير مرحلي واختبار الأمان والجودة', 'إطلاق مدروس وقياس وتحسين'] : ['Discover workflows, users, and risks', 'Define scope, integrations, and acceptance criteria', 'Design and review the prototype', 'Develop iteratively and test security and quality', 'Launch deliberately, measure, and improve'];
  const faqSchema = page.faq.map((item) => ({ '@type': 'Question', name: item.question[locale], acceptedAnswer: { '@type': 'Answer', text: item.answer[locale] } }));
  return <><JsonLd data={{ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: page.title[locale], description: page.description[locale], url, provider: { '@type': 'Organization', name: businessConfig.companyName[locale], url: businessConfig.appUrl }, areaServed: { '@type': 'Country', name: 'Saudi Arabia' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: ar ? 'الرئيسية' : 'Home', item: `${businessConfig.appUrl}/${locale}` }, { '@type': 'ListItem', position: 2, name: ar ? 'حلول القطاعات' : 'Industry solutions', item: `${businessConfig.appUrl}/${locale}/industries/${page.slug}` }, { '@type': 'ListItem', position: 3, name: page.title[locale], item: url }] },
    { '@type': 'FAQPage', mainEntity: faqSchema },
  ] }}/><Navbar/><main className="pt-[72px]">
    <article>
      <header className="border-b border-surface-border bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.12),transparent_40%)]"><div className="container-max px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><nav aria-label={ar ? 'مسار التنقل' : 'Breadcrumb'} className="text-sm text-ink-muted"><Link href={`/${locale}`}>{ar ? 'الرئيسية' : 'Home'}</Link><span className="mx-2">/</span><span>{ar ? 'حلول القطاعات' : 'Industries'}</span><span className="mx-2">/</span><span aria-current="page">{page.title[locale]}</span></nav><div className="mt-9 max-w-4xl"><p className="text-sm font-semibold text-brand-cyan-300">{page.eyebrow[locale]}</p><h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">{page.title[locale]}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-secondary">{page.description[locale]}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={`/${locale}/contact?service=${page.projectCategory === 'ECOMMERCE' ? 'ecommerce' : page.projectCategory === 'MOBILE' ? 'app' : page.projectCategory === 'WEB' ? 'web' : 'software'}`} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 font-semibold text-surface">{ar ? 'ناقش متطلباتك' : 'Discuss your requirements'}<ArrowRight className="h-4 w-4 rtl:rotate-180"/></Link><Link href={`/${locale}/pricing`} className="inline-flex min-h-[48px] items-center rounded-xl border border-surface-border px-6 font-semibold text-white">{ar ? 'استخدم أداة التقدير' : 'Use the estimator'}</Link></div></div></div></header>
      <div className="container-max px-4 py-14 sm:px-6 lg:px-8">
        <section aria-labelledby="challenges-title"><h2 id="challenges-title" className="font-display text-3xl font-semibold text-white">{ar ? 'تحديات القطاع' : 'Industry challenges'}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{page.challenges.map((item) => <div key={item.en} className="rounded-2xl border border-surface-border bg-surface-card p-6"><CheckCircle2 className="h-6 w-6 text-rose-300"/><p className="mt-4 leading-7 text-ink-secondary">{item[locale]}</p></div>)}</div></section>
        <section className="mt-14 grid gap-6 rounded-3xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 p-7 lg:grid-cols-[.35fr_.65fr] lg:p-10"><div><p className="text-sm font-semibold text-brand-cyan-300">{ar ? 'الحل الرقمي المقترح' : 'Recommended digital solution'}</p><Workflow className="mt-5 h-10 w-10 text-brand-cyan-400"/></div><p className="text-lg leading-8 text-ink-secondary">{page.solution[locale]}</p></section>
        <section className="mt-14 grid gap-8 lg:grid-cols-2"><div><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'الميزات الرئيسية' : 'Main features'}</h2><ul className="mt-6 space-y-3">{page.features.map((item) => <li key={item.en} className="flex gap-3 rounded-xl border border-surface-border bg-surface-card p-4 text-ink-secondary"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan-400"/>{item[locale]}</li>)}</ul></div><div><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'قدرات التكامل' : 'Integration capabilities'}</h2><ul className="mt-6 space-y-3">{page.integrations.map((item) => <li key={item.en} className="flex gap-3 rounded-xl border border-surface-border bg-surface-card p-4 text-ink-secondary"><Plug className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple-400"/>{item[locale]}</li>)}</ul><p className="mt-4 text-xs leading-6 text-ink-muted">{ar ? 'هذه قدرات محتملة وليست تكاملات جاهزة أو مضمونة. يتم التحقق الفني والتجاري والأمني قبل إدراج أي تكامل في النطاق.' : 'These are potential capabilities, not guaranteed or prebuilt integrations. Technical, commercial, and security validation happens before any integration enters scope.'}</p></div></section>
        <section className="mt-14"><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'عملية التطوير' : 'Development process'}</h2><ol className="mt-7 grid gap-4 md:grid-cols-5">{process.map((item, index) => <li key={item} className="rounded-2xl border border-surface-border bg-surface-card p-5"><span className="font-display text-2xl font-bold text-brand-cyan-400">0{index + 1}</span><p className="mt-3 text-sm leading-6 text-ink-secondary">{item}</p></li>)}</ol></section>
        <section className="mt-14"><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'تقنيات مناسبة حسب النطاق' : 'Relevant technologies by scope'}</h2><div className="mt-6 flex flex-wrap gap-2">{page.technologies.map((technology) => <span key={technology} className="rounded-full border border-surface-border bg-surface-card px-4 py-2 text-sm text-ink-secondary">{technology}</span>)}</div></section>
        {caseStudy && (!ar || caseStudy.titleAr) && <section className="mt-14 rounded-3xl border border-surface-border bg-surface-card p-7"><p className="text-sm font-semibold text-brand-cyan-300">{ar ? 'دراسة حالة حقيقية ذات صلة' : 'Relevant real case study'}</p><h2 className="mt-3 font-display text-2xl font-semibold text-white">{ar ? caseStudy.titleAr : caseStudy.titleEn}</h2><p className="mt-3 max-w-3xl leading-7 text-ink-secondary">{ar ? caseStudy.descriptionAr : caseStudy.descriptionEn}</p><Link href={`/${locale}/work/${caseStudy.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-cyan-300">{ar ? 'عرض دراسة الحالة' : 'View case study'}<ArrowRight className="h-4 w-4 rtl:rotate-180"/></Link></section>}
        <section className="mt-14"><h2 className="font-display text-3xl font-semibold text-white">{ar ? 'أسئلة شائعة' : 'Frequently asked questions'}</h2><div className="mt-6 divide-y divide-surface-border rounded-2xl border border-surface-border bg-surface-card">{page.faq.map((item) => <details key={item.question.en} className="p-5"><summary className="cursor-pointer font-semibold text-white">{item.question[locale]}</summary><p className="mt-3 leading-7 text-ink-secondary">{item.answer[locale]}</p></details>)}</div></section>
        <nav className="mt-14 border-t border-surface-border pt-8" aria-label={ar ? 'حلول قطاعات أخرى' : 'Other industry solutions'}><h2 className="font-display text-xl font-semibold text-white">{ar ? 'استكشف قطاعات أخرى' : 'Explore other industries'}</h2><div className="mt-4 flex flex-wrap gap-2">{industrySolutions.filter((item) => item.slug !== page.slug).map((item) => <Link key={item.slug} href={`/${locale}/industries/${item.slug}`} className="rounded-full border border-surface-border px-4 py-2 text-sm text-ink-secondary hover:text-white">{item.title[locale]}</Link>)}</div></nav>
      </div>
    </article><ConsultationBooking/>
  </main><Footer/><FloatingWhatsApp/></>;
}
