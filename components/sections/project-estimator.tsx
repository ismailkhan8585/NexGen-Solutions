'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calculator, MessageCircle } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { formatSar, getWhatsAppUrl } from '@/lib/business-config';
import { calculateEstimate, estimatorConfig, type EstimatorSelections } from '@/lib/estimator-config';

const initial: EstimatorSelections = { projectType: 'website', units: 5, complexity: 'standard', bilingual: true, ecommerce: false, authentication: false, adminDashboard: false, payments: false, integrations: 0, timeline: 'flexible' };

export function ProjectEstimator() {
  const { locale } = useI18n(); const ar = locale === 'ar';
  const [value, setValue] = useState(initial);
  const estimate = useMemo(() => calculateEstimate(value), [value]);
  const typeLabel = estimatorConfig.projectTypes[value.projectType].label[locale];
  const summary = ar ? `طلب تقدير مشروع\nنوع المشروع: ${typeLabel}\nالصفحات/الشاشات: ${value.units}\nالنطاق التقديري غير الملزم: ${formatSar(estimate.min, locale)} – ${formatSar(estimate.max, locale)}` : `Project estimate request\nProject type: ${typeLabel}\nPages/screens: ${value.units}\nNon-binding estimated range: ${formatSar(estimate.min, locale)} – ${formatSar(estimate.max, locale)}`;
  const whatsapp = getWhatsAppUrl(locale, { service: typeLabel, project: summary });
  const service = value.projectType === 'mobile' ? 'app' : value.projectType === 'website' ? 'web' : value.projectType;
  const query = new URLSearchParams({ service, estimate: summary }).toString();
  const toggles: Array<[keyof Pick<EstimatorSelections, 'bilingual'|'ecommerce'|'authentication'|'adminDashboard'|'payments'>, string, string]> = [['bilingual','دعم العربية والإنجليزية','Arabic and English support'],['ecommerce','وظائف التجارة الإلكترونية','E-commerce functionality'],['authentication','تسجيل الدخول والصلاحيات','Authentication and roles'],['adminDashboard','لوحة تحكم إدارية','Admin dashboard'],['payments','تكامل الدفع','Payment integration']];
  const field = 'w-full min-h-[46px] rounded-xl border border-surface-border bg-surface px-3 text-sm text-white focus:border-brand-cyan-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan-400/20';

  return <section aria-labelledby="estimator-title" className="section-padding bg-surface-hover/40"><div className="container-max px-4 sm:px-6 lg:px-8">
    <header className="mx-auto max-w-3xl text-center"><Calculator className="mx-auto h-8 w-8 text-brand-cyan-400" aria-hidden="true"/><h2 id="estimator-title" className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">{ar?'احسب نطاقاً أولياً لمشروعك':'Estimate your initial project range'}</h2><p className="mt-4 leading-7 text-ink-secondary">{ar?'أداة تخطيط أولية بالريال السعودي. النتيجة ليست عرض سعر أو التزاماً نهائياً.':'An initial planning tool in Saudi riyals. The result is not a quotation or binding commitment.'}</p></header>
    <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.25fr_.75fr]">
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-7"><div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-ink-secondary"><span>{ar?'نوع المشروع':'Project type'}</span><select className={field} value={value.projectType} onChange={e=>setValue({...value,projectType:e.target.value as EstimatorSelections['projectType']})}>{Object.entries(estimatorConfig.projectTypes).map(([key,item])=><option value={key} key={key}>{item.label[locale]}</option>)}</select></label>
        <label className="space-y-2 text-sm text-ink-secondary"><span>{ar?'عدد الصفحات أو الشاشات':'Number of pages or screens'}</span><input className={field} type="number" min="1" max="100" value={value.units} onChange={e=>setValue({...value,units:Number(e.target.value)})}/></label>
        <label className="space-y-2 text-sm text-ink-secondary"><span>{ar?'تعقيد التصميم':'Design complexity'}</span><select className={field} value={value.complexity} onChange={e=>setValue({...value,complexity:e.target.value as EstimatorSelections['complexity']})}>{Object.entries(estimatorConfig.complexity).map(([key,item])=><option value={key} key={key}>{item.label[locale]}</option>)}</select></label>
        <label className="space-y-2 text-sm text-ink-secondary"><span>{ar?'المدة المتوقعة':'Expected timeline'}</span><select className={field} value={value.timeline} onChange={e=>setValue({...value,timeline:e.target.value as EstimatorSelections['timeline']})}>{Object.entries(estimatorConfig.timeline).map(([key,item])=><option value={key} key={key}>{item.label[locale]}</option>)}</select></label>
        <label className="space-y-2 text-sm text-ink-secondary sm:col-span-2"><span>{ar?'عدد التكاملات الخارجية':'Third-party integrations'}</span><input className={field} type="number" min="0" max="10" value={value.integrations} onChange={e=>setValue({...value,integrations:Number(e.target.value)})}/></label>
      </div><fieldset className="mt-6 grid gap-3 sm:grid-cols-2"><legend className="mb-3 text-sm font-semibold text-white">{ar?'الوظائف المطلوبة':'Required functionality'}</legend>{toggles.map(([key,a,e])=><label key={key} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-surface-border p-3 text-sm text-ink-secondary"><input type="checkbox" checked={value[key]} onChange={event=>setValue({...value,[key]:event.target.checked})} className="h-4 w-4 accent-cyan-400"/>{ar?a:e}</label>)}</fieldset></div>
      <aside className="h-fit rounded-2xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 p-6" aria-live="polite"><p className="text-sm font-medium text-brand-cyan-300">{ar?'النطاق التقديري غير الملزم':'Non-binding estimated range'}</p><p className="mt-4 font-display text-2xl font-bold text-white">{formatSar(estimate.min,locale)} – {formatSar(estimate.max,locale)}</p><p className="mt-4 text-xs leading-6 text-ink-muted">{ar?'يتغير السعر النهائي بعد تحليل المتطلبات والمحتوى والتكاملات والمخاطر والجدول الزمني.':'The final quotation depends on complete requirements, content, integrations, risks, and delivery schedule.'}</p><div className="mt-6 grid gap-3"><Link href={`/${locale}/contact?${query}`} className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-4 font-semibold text-surface">{ar?'أرسل النتيجة مع الطلب':'Send with enquiry'}</Link>{whatsapp&&<a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-600 px-4 font-semibold text-white"><MessageCircle className="h-4 w-4"/>{ar?'أرسل عبر واتساب':'Send via WhatsApp'}</a>}</div></aside>
    </div></div></section>;
}
