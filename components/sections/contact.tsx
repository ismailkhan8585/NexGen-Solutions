'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { businessConfig, buildWhatsAppLeadMessage, formatSaudiPhone, getWhatsAppUrl } from '@/lib/business-config';
import { BUDGET_RANGES, SERVICES, TIMELINES } from '@/lib/constants';

type FormState = {
  name: string; company: string; phone: string; email: string; service: string;
  budget: string; timeline: string; desiredLaunchDate: string; description: string;
  languageRequirement: 'arabic' | 'english' | 'bilingual' | '';
  preferredLanguage: 'ar' | 'en'; preferredContactMethod: 'email' | 'phone' | 'whatsapp' | ''; consent: boolean;
};

const emptyForm = (locale: 'ar' | 'en'): FormState => ({ name: '', company: '', phone: '', email: '', service: '', budget: '', timeline: '', desiredLaunchDate: '', description: '', languageRequirement: '', preferredLanguage: locale, preferredContactMethod: '', consent: false });
const inputClass = 'mt-1.5 w-full min-h-[46px] rounded-xl border border-surface-border bg-surface px-4 py-2.5 text-sm text-white outline-none transition focus:border-brand-cyan-400 focus:ring-2 focus:ring-brand-cyan-400/20';

export function Contact() {
  const { t, locale } = useI18n();
  const ar = locale === 'ar';
  const params = useSearchParams();
  const estimate = params.get('estimate')?.slice(0, 2000) || '';
  const estimateRange = params.get('estimateRange')?.slice(0, 200) || '';
  const requestedService = params.get('service');
  const initialService = requestedService && (SERVICES as readonly string[]).includes(requestedService) ? requestedService : '';
  const [form, setForm] = useState<FormState>(() => ({ ...emptyForm(locale), service: initialService, description: estimate }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const draftKey = `nexgen-inquiry-draft-${locale}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) setForm((current) => ({ ...current, ...JSON.parse(saved), service: initialService || JSON.parse(saved).service || '', description: estimate || JSON.parse(saved).description || '', consent: false }));
    } catch { /* A blocked or invalid local draft must not prevent enquiry submission. */ }
  }, [draftKey, estimate, initialService]);

  useEffect(() => {
    try { localStorage.setItem(draftKey, JSON.stringify({ ...form, consent: false })); } catch { /* Draft preservation is best-effort. */ }
  }, [draftKey, form]);

  const labels = ar ? ['معلومات التواصل', 'متطلبات المشروع', 'الميزانية والمدة', 'المراجعة والموافقة'] : ['Contact information', 'Project requirements', 'Budget and timeline', 'Review and consent'];
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const errorText = ar ? 'يرجى إكمال هذا الحقل بصورة صحيحة.' : 'Please complete this field correctly.';

  function validate(currentStep = step) {
    const next: Record<string, string> = {};
    if (currentStep === 0) {
      if (form.name.trim().length < 2) next.name = errorText;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = errorText;
      if (!/^[+\d][\d\s()-]{6,24}$/.test(form.phone)) next.phone = errorText;
    }
    if (currentStep === 1) {
      if (!(SERVICES as readonly string[]).includes(form.service)) next.service = errorText;
      if (!['arabic', 'english', 'bilingual'].includes(form.languageRequirement)) next.languageRequirement = errorText;
      if (form.description.trim().length < 20) next.description = ar ? 'أضف وصفاً من 20 حرفاً على الأقل.' : 'Add a description of at least 20 characters.';
    }
    if (currentStep === 2) {
      if (!(BUDGET_RANGES as readonly string[]).includes(form.budget)) next.budget = errorText;
      if (!(TIMELINES as readonly string[]).includes(form.timeline)) next.timeline = errorText;
      if (!['email', 'phone', 'whatsapp'].includes(form.preferredContactMethod)) next.preferredContactMethod = errorText;
      if (form.desiredLaunchDate && !/^\d{4}-\d{2}-\d{2}$/.test(form.desiredLaunchDate)) next.desiredLaunchDate = errorText;
    }
    if (currentStep === 3 && !form.consent) next.consent = ar ? 'الموافقة مطلوبة لإرسال الطلب.' : 'Consent is required to submit the enquiry.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() { if (validate()) { setStep((value) => Math.min(3, value + 1)); setResult(null); } }

  const serviceLabel = form.service ? t(`services.${form.service}`) : '';
  const budgetLabel = form.budget ? t(`common.budget_${form.budget}`) : '';
  const timelineLabel = form.timeline ? t(`common.timeline_${form.timeline}`) : '';
  const languageRequirementLabel = form.languageRequirement === 'bilingual' ? (ar ? 'العربية والإنجليزية' : 'Arabic and English') : form.languageRequirement === 'arabic' ? 'العربية' : form.languageRequirement === 'english' ? 'English' : '';
  const contactMethodLabel = form.preferredContactMethod === 'whatsapp' ? (ar ? 'واتساب' : 'WhatsApp') : form.preferredContactMethod === 'phone' ? (ar ? 'مكالمة هاتفية' : 'Phone call') : form.preferredContactMethod === 'email' ? (ar ? 'البريد الإلكتروني' : 'Email') : '';
  const whatsappSummary = [form.description, languageRequirementLabel && `${ar ? 'اللغات المطلوبة' : 'Required languages'}: ${languageRequirementLabel}`, form.desiredLaunchDate && `${ar ? 'تاريخ الإطلاق المستهدف' : 'Target launch date'}: ${form.desiredLaunchDate}`, contactMethodLabel && `${ar ? 'طريقة التواصل' : 'Contact method'}: ${contactMethodLabel}`].filter(Boolean).join('\n');
  const whatsappMessage = useMemo(() => buildWhatsAppLeadMessage(locale, { name: form.name, service: serviceLabel, budget: budgetLabel, timeline: timelineLabel, summary: whatsappSummary, estimate: estimateRange, preferredLanguage: form.preferredLanguage }), [budgetLabel, estimateRange, form.name, form.preferredLanguage, locale, serviceLabel, timelineLabel, whatsappSummary]);
  const whatsappUrl = getWhatsAppUrl(locale, whatsappMessage);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate(3)) return;
    setSubmitting(true); setResult(null);
    const website = new FormData(event.currentTarget).get('website');
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ clientName: form.name, company: form.company, phone: form.phone, email: form.email, service: form.service, budget: form.budget, timeline: form.timeline, description: form.description, preferredLanguage: form.preferredLanguage, consent: form.consent, website, formStartedAt, estimatorData: { summary: estimate || '', range: estimateRange || '', languageRequirement: form.languageRequirement, preferredContactMethod: form.preferredContactMethod, desiredLaunchDate: form.desiredLaunchDate } }) });
      const body = await response.json().catch(() => null) as { refNumber?: string; fields?: Record<string, string> } | null;
      if (response.ok && body?.refNumber) {
        try { localStorage.removeItem(draftKey); } catch { /* Submission is already confirmed. */ }
        setResult({ type: 'success', message: ar ? `تم استلام طلبك. الرقم المرجعي: ${body.refNumber}` : `Your enquiry was received. Reference: ${body.refNumber}` });
      } else {
        if (body?.fields) setErrors(Object.fromEntries(Object.keys(body.fields).map((key) => [key === 'clientName' ? 'name' : key, errorText])));
        setResult({ type: 'error', message: response.status === 429 ? (ar ? 'تم إرسال عدة طلبات. حاول مرة أخرى لاحقاً.' : 'Too many enquiries were submitted. Please try again later.') : t('contact.error') });
      }
    } catch { setResult({ type: 'error', message: t('contact.networkError') }); }
    finally { setSubmitting(false); }
  }

  const fieldError = (name: string) => errors[name] ? <p id={`${name}-error`} className="mt-1 text-xs text-rose-400" role="alert">{errors[name]}</p> : null;
  const review = [[ar ? 'الاسم' : 'Name', form.name], [ar ? 'الشركة' : 'Company', form.company || '—'], [ar ? 'البريد' : 'Email', form.email], [ar ? 'الهاتف' : 'Phone', form.phone], [ar ? 'الخدمة' : 'Service', serviceLabel], [ar ? 'لغات المنتج' : 'Product languages', languageRequirementLabel], [ar ? 'الميزانية' : 'Budget', budgetLabel], [ar ? 'المدة' : 'Timeline', timelineLabel], [ar ? 'تاريخ الإطلاق المستهدف' : 'Target launch date', form.desiredLaunchDate || '—'], [ar ? 'طريقة التواصل' : 'Contact method', contactMethodLabel], [ar ? 'لغة التواصل' : 'Preferred language', form.preferredLanguage === 'ar' ? 'العربية' : 'English']];

  return <section id="contact" className="section-padding bg-surface-hover/50"><div className="container-max px-4 sm:px-6 lg:px-8">
    <header className="mx-auto mb-10 max-w-3xl text-center"><p className="text-sm font-semibold text-brand-cyan-300">{t('contact.badge')}</p><h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">{t('contact.title')}</h1><p className="mt-4 text-ink-secondary">{t('contact.subtitle')}</p></header>
    <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1.4fr_.6fr]">
      <div className="rounded-3xl border border-surface-border bg-surface-card p-5 sm:p-8">
        <ol className="grid grid-cols-4 gap-2" aria-label={ar ? 'تقدم نموذج المشروع' : 'Project form progress'}>{labels.map((label, index) => <li key={label} className="min-w-0"><div className={`h-1.5 rounded-full ${index <= step ? 'bg-brand-cyan-400' : 'bg-surface-border'}`}/><span className={`mt-2 hidden text-xs sm:block ${index === step ? 'text-white' : 'text-ink-muted'}`} aria-current={index === step ? 'step' : undefined}>{index + 1}. {label}</span></li>)}</ol>
        <form className="mt-8" onSubmit={submit} noValidate>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <fieldset><legend className="font-display text-xl font-semibold text-white">{labels[step]}</legend>
            {step === 0 && <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-ink-secondary">{t('contact.name')}<input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={120} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}/>{fieldError('name')}</label>
              <label className="text-sm text-ink-secondary">{t('contact.company')}<input className={inputClass} value={form.company} onChange={(e) => set('company', e.target.value)} maxLength={160} autoComplete="organization"/></label>
              <label className="text-sm text-ink-secondary">{t('contact.phone')}<input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} maxLength={30} type="tel" autoComplete="tel" aria-invalid={!!errors.phone}/>{fieldError('phone')}</label>
              <label className="text-sm text-ink-secondary">{t('contact.email')}<input className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} maxLength={254} type="email" autoComplete="email" aria-invalid={!!errors.email}/>{fieldError('email')}</label>
            </div>}
            {step === 1 && <div className="mt-5 grid gap-4">
              <label className="text-sm text-ink-secondary">{t('contact.service')}<select className={inputClass} value={form.service} onChange={(e) => set('service', e.target.value)} aria-invalid={!!errors.service}><option value="">{t('contact.selectService')}</option>{SERVICES.map((item) => <option key={item} value={item}>{t(`services.${item}`)}</option>)}</select>{fieldError('service')}</label>
              <label className="text-sm text-ink-secondary">{ar ? 'لغات المنتج المطلوبة' : 'Required product languages'}<select className={inputClass} value={form.languageRequirement} onChange={(e) => set('languageRequirement', e.target.value as FormState['languageRequirement'])} aria-invalid={!!errors.languageRequirement} aria-describedby={errors.languageRequirement ? 'languageRequirement-error' : undefined}><option value="">{ar ? 'اختر اللغات' : 'Select languages'}</option><option value="arabic">العربية</option><option value="english">English</option><option value="bilingual">{ar ? 'العربية والإنجليزية' : 'Arabic and English'}</option></select>{fieldError('languageRequirement')}</label>
              <label className="text-sm text-ink-secondary">{t('contact.description')}<textarea className={`${inputClass} min-h-36 resize-y`} value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={4000} aria-invalid={!!errors.description}/>{fieldError('description')}</label>
              {estimate && <div className="rounded-xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 p-4"><p className="text-xs font-semibold text-brand-cyan-300">{ar ? 'ملخص أداة التقدير' : 'Estimator summary'}</p><pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-6 text-ink-secondary">{estimate}</pre></div>}
            </div>}
            {step === 2 && <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-ink-secondary">{t('contact.budget')}<select className={inputClass} value={form.budget} onChange={(e) => set('budget', e.target.value)} aria-invalid={!!errors.budget}><option value="">{t('contact.selectBudget')}</option>{BUDGET_RANGES.map((item) => <option key={item} value={item}>{t(`common.budget_${item}`)}</option>)}</select>{fieldError('budget')}</label>
              <label className="text-sm text-ink-secondary">{t('contact.timeline')}<select className={inputClass} value={form.timeline} onChange={(e) => set('timeline', e.target.value)} aria-invalid={!!errors.timeline}><option value="">{t('contact.selectTimeline')}</option>{TIMELINES.map((item) => <option key={item} value={item}>{t(`common.timeline_${item}`)}</option>)}</select>{fieldError('timeline')}</label>
              <label className="text-sm text-ink-secondary">{ar ? 'تاريخ الإطلاق المستهدف' : 'Target launch date'}<input type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.desiredLaunchDate} onChange={(e) => set('desiredLaunchDate', e.target.value)} aria-invalid={!!errors.desiredLaunchDate}/>{fieldError('desiredLaunchDate')}</label>
              <label className="text-sm text-ink-secondary">{ar ? 'طريقة التواصل المفضلة' : 'Preferred contact method'}<select className={inputClass} value={form.preferredContactMethod} onChange={(e) => set('preferredContactMethod', e.target.value as FormState['preferredContactMethod'])} aria-invalid={!!errors.preferredContactMethod} aria-describedby={errors.preferredContactMethod ? 'preferredContactMethod-error' : undefined}><option value="">{ar ? 'اختر طريقة التواصل' : 'Select contact method'}</option><option value="email">{ar ? 'البريد الإلكتروني' : 'Email'}</option><option value="phone">{ar ? 'مكالمة هاتفية' : 'Phone call'}</option><option value="whatsapp">{ar ? 'واتساب' : 'WhatsApp'}</option></select>{fieldError('preferredContactMethod')}</label>
              <label className="text-sm text-ink-secondary">{ar ? 'لغة التواصل المفضلة' : 'Preferred language'}<select className={inputClass} value={form.preferredLanguage} onChange={(e) => set('preferredLanguage', e.target.value as 'ar' | 'en')}><option value="ar">العربية</option><option value="en">English</option></select></label>
            </div>}
            {step === 3 && <div className="mt-5"><dl className="grid gap-3 rounded-2xl border border-surface-border bg-surface p-5 sm:grid-cols-2">{review.map(([label, value]) => <div key={label}><dt className="text-xs text-ink-muted">{label}</dt><dd className="mt-1 break-words text-sm text-white">{value}</dd></div>)}</dl><div className="mt-4 rounded-xl border border-surface-border p-4"><p className="text-xs text-ink-muted">{ar ? 'ملخص المشروع' : 'Project summary'}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink-secondary">{form.description}</p></div><label className="mt-4 flex items-start gap-3 rounded-xl border border-surface-border p-4 text-sm leading-6 text-ink-secondary"><input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-400" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent}/><span>{ar ? 'أوافق على استخدام بياناتي للرد على هذا الطلب وفق ' : 'I consent to the use of my information to respond to this enquiry under the '}<Link className="text-brand-cyan-300 underline" href={`/${locale}/privacy-policy`}>{ar ? 'سياسة الخصوصية' : 'privacy policy'}</Link>.</span></label>{fieldError('consent')}</div>}
          </fieldset>
          {result && <p className={`mt-5 rounded-xl border p-4 text-sm ${result.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`} role={result.type === 'error' ? 'alert' : 'status'}>{result.type === 'success' && <Check className="me-2 inline h-4 w-4"/>}{result.message}</p>}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><button type="button" disabled={step === 0 || submitting} onClick={() => { setStep((value) => Math.max(0, value - 1)); setErrors({}); }} className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-surface-border px-5 text-sm font-semibold text-white disabled:opacity-40"><ChevronLeft className="h-4 w-4 rtl:rotate-180"/>{ar ? 'السابق' : 'Back'}</button><div className="flex flex-wrap gap-3">{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center rounded-xl border border-emerald-500/30 px-5 text-sm font-semibold text-emerald-300">{ar ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</a>}{step < 3 ? <button type="button" onClick={nextStep} className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-surface">{ar ? 'التالي' : 'Next'}<ChevronRight className="h-4 w-4 rtl:rotate-180"/></button> : <button type="submit" disabled={submitting || result?.type === 'success'} className="inline-flex min-h-[46px] items-center rounded-xl bg-white px-6 text-sm font-semibold text-surface disabled:opacity-50">{submitting ? t('common.loading') : t('contact.submit')}</button>}</div></div>
        </form>
      </div>
      <aside className="h-fit rounded-3xl border border-surface-border bg-surface-card p-6"><h2 className="font-display text-xl font-semibold text-white">{t('contact.whyWork')}</h2><ul className="mt-5 space-y-3 text-sm text-ink-secondary">{[t('contact.why1'), t('contact.why2'), t('contact.why3')].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"/>{item}</li>)}</ul><div className="mt-7 space-y-4 border-t border-surface-border pt-6 text-sm text-ink-secondary">{businessConfig.businessEmail && <a className="flex items-center gap-3 hover:text-white" href={`mailto:${businessConfig.businessEmail}`}><Mail className="h-4 w-4"/>{businessConfig.businessEmail}</a>}{businessConfig.phone && <a className="flex items-center gap-3 hover:text-white" href={`tel:+${businessConfig.phone.replace(/\D/g, '')}`}><Phone className="h-4 w-4"/>{formatSaudiPhone(businessConfig.phone, locale)}</a>}{businessConfig.address[locale] && <span className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/>{businessConfig.address[locale]}</span>}<span className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0"/><span>{businessConfig.workingHours[locale] || t('contact.responseTime')}<span className="mt-1 block text-xs text-ink-muted">{ar ? 'المنطقة الزمنية: توقيت الرياض (Asia/Riyadh)' : 'Timezone: Riyadh (Asia/Riyadh)'}</span></span></span></div></aside>
    </div>
  </div></section>;
}
