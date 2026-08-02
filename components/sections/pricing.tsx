'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';

export function Pricing() {
  const { locale, t } = useI18n();
  const ar = locale === 'ar';
  const scopes = ar ? [
    { title: 'موقع أو تجربة تسويقية', items: ['تحديد الصفحات والمحتوى', 'تصميم متجاوب وثنائي اللغة', 'تهيئة الإطلاق والقياس'] },
    { title: 'متجر أو منتج رقمي', items: ['رحلات المستخدم والتكاملات', 'لوحة إدارة وصلاحيات', 'اختبارات الأداء والإطلاق'] },
    { title: 'نظام مخصص أو دعم مستمر', items: ['تحليل العمليات والمخاطر', 'مراحل تطوير قابلة للمراجعة', 'نطاق صيانة ومستوى خدمة متفق عليه'] },
  ] : [
    { title: 'Website or marketing experience', items: ['Pages and content scope', 'Responsive bilingual design', 'Launch and measurement foundations'] },
    { title: 'Store or digital product', items: ['User journeys and integrations', 'Administration and permissions', 'Performance testing and launch'] },
    { title: 'Custom system or ongoing support', items: ['Workflow and risk analysis', 'Reviewable delivery milestones', 'Agreed maintenance and service scope'] },
  ];
  return <section id="pricing" className="section-padding bg-surface"><div className="container-max px-4 sm:px-6 lg:px-8"><header className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold text-brand-cyan-300">{t('pricing.badge')}</p><h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">{ar ? 'تقدير واضح بالريال السعودي' : 'Clear estimates in Saudi riyals'}</h1><p className="mt-5 text-lg leading-8 text-ink-secondary">{ar ? 'لا ننشر سعراً مضللاً قبل معرفة النطاق. نراجع المتطلبات ثم نقدم مراحل وتقديراً بالريال السعودي.' : 'We do not publish misleading prices before understanding scope. Requirements are reviewed before milestones and a SAR estimate are prepared.'}</p></header><div className="mt-12 grid gap-5 md:grid-cols-3">{scopes.map((scope) => <article key={scope.title} className="rounded-2xl border border-surface-border bg-surface-card p-6"><h2 className="font-display text-xl font-semibold text-white">{scope.title}</h2><p className="mt-3 text-sm font-medium text-brand-cyan-300">{ar ? 'تقدير مخصص بالريال' : 'Custom SAR estimate'}</p><ul className="mt-5 space-y-3">{scope.items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-ink-secondary"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan-400" />{item}</li>)}</ul></article>)}</div><div className="mt-10 text-center"><Link href={`/${locale}/contact`} className="inline-flex min-h-[48px] items-center rounded-xl bg-white px-6 py-3 font-semibold text-surface">{ar ? 'اطلب تقدير مشروعك' : 'Request a project estimate'}</Link></div></div></section>;
}
