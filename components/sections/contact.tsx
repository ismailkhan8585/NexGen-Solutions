'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { FadeIn } from '@/components/animations/fade-in';
import { SERVICES, BUDGET_RANGES, TIMELINES } from '@/lib/constants';
import { businessConfig, formatSaudiPhone, getWhatsAppUrl } from '@/lib/business-config';
import { Check, Mail, Phone, Clock, Globe } from 'lucide-react';

export function Contact() {
  const { t, locale } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const searchParams = useSearchParams();
  const requestedService = searchParams.get('service');
  const initialService = requestedService && (SERVICES as readonly string[]).includes(requestedService) ? requestedService : '';
  const estimateSummary = searchParams.get('estimate')?.slice(0, 1500) || '';
  const [whatsappService, setWhatsappService] = useState(initialService);
  const [whatsappProject, setWhatsappProject] = useState(estimateSummary);
  const whatsappUrl = getWhatsAppUrl(locale);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      clientName: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      service: formData.get('service'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      description: formData.get('description'),
      preferredLanguage: formData.get('preferredLanguage'),
      consent: formData.get('consent') === 'on',
      website: formData.get('website'),
      formStartedAt,
      estimatorData: estimateSummary ? { summary: estimateSummary } : null,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => null) as { refNumber?: string } | null;
      if (res.ok && result?.refNumber) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(t('contact.error'));
      }
    } catch {
      setError(t('contact.networkError'));
    }
    setSubmitting(false);
  }

  return (
    <section id="contact" className="section-padding bg-surface-hover/50 relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('contact.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <FadeIn>
            <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 rounded-t-2xl" />

              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-white text-lg font-medium mb-2">
                    {t('contact.success')}
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-brand-purple-400 text-sm hover:text-brand-purple-300"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.name')}
                      </label>
                      <input
                        name="name"
                        id="inquiry-name"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={120}
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-email" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.email')}
                      </label>
                      <input
                        name="email"
                        id="inquiry-email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        placeholder={t('contact.emailPlaceholder')}
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.phone')}
                      </label>
                      <input
                        name="phone"
                        id="inquiry-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        minLength={7}
                        maxLength={30}
                        placeholder={t('contact.phonePlaceholder')}
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-company" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.company')}
                      </label>
                      <input
                        name="company"
                        id="inquiry-company"
                        autoComplete="organization"
                        maxLength={160}
                        placeholder={t('contact.companyPlaceholder')}
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-service" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.service')}
                      </label>
                      <select
                        name="service"
                        id="inquiry-service"
                        required
                        defaultValue={initialService}
                        onChange={(event) => setWhatsappService(event.target.value)}
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      >
                        <option value="" disabled>
                          {t('contact.selectService')}
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {t(`services.${s}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiry-budget" className="block text-ink-secondary text-sm mb-1.5">
                        {t('contact.budget')}
                      </label>
                      <select
                        name="budget"
                        id="inquiry-budget"
                        defaultValue=""
                        required
                        className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                      >
                        <option value="" disabled>
                          {t('contact.selectBudget')}
                        </option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {t(`common.budget_${b}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-timeline" className="block text-ink-secondary text-sm mb-1.5">
                      {t('contact.timeline')}
                    </label>
                    <select
                      name="timeline"
                      id="inquiry-timeline"
                      defaultValue=""
                      required
                      className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
                    >
                      <option value="" disabled>
                        {t('contact.selectTimeline')}
                      </option>
                      {TIMELINES.map((tl) => (
                        <option key={tl} value={tl}>
                          {t(`common.timeline_${tl}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inquiry-description" className="block text-ink-secondary text-sm mb-1.5">
                      {t('contact.description')}
                    </label>
                    <textarea
                      name="description"
                      id="inquiry-description"
                      required
                      minLength={20}
                      maxLength={4000}
                      rows={4}
                      defaultValue={estimateSummary}
                      onChange={(event) => setWhatsappProject(event.target.value.slice(0, 800))}
                      placeholder={t('contact.descriptionPlaceholder')}
                      className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-language" className="mb-1.5 block text-sm text-ink-secondary">{locale === 'ar' ? 'لغة التواصل المفضلة' : 'Preferred language'}</label>
                    <select name="preferredLanguage" id="inquiry-language" defaultValue={locale} required className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500"><option value="ar">العربية</option><option value="en">English</option></select>
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-surface-border p-3 text-sm leading-6 text-ink-secondary">
                    <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" />
                    <span>{locale === 'ar' ? 'أوافق على استخدام بياناتي للرد على هذا الطلب وفق سياسة الخصوصية.' : 'I consent to the use of my information to respond to this enquiry under the privacy policy.'}</span>
                  </label>

                  {error && (
                    <p className="text-rose-400 text-sm" role="alert" aria-live="assertive">{error}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <GradientButton
                      type="submit"
                      disabled={submitting}
                      className="flex-1"
                    >
                      {submitting ? t('common.loading') : t('contact.submit')}
                    </GradientButton>
                    <WhatsAppButton
                      label={t('contact.whatsapp')}
                      className="flex-1"
                      context={{ service: whatsappService ? t(`services.${whatsappService}`) : null, project: whatsappProject || null }}
                    />
                  </div>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="font-display font-semibold text-white text-lg mb-4">
                {t('contact.whyWork')}
              </h3>
              <ul className="space-y-3 mb-8">
                {[t('contact.why1'), t('contact.why2'), t('contact.why3')].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-ink-secondary text-sm">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 pt-6 border-t border-surface-border">
                {businessConfig.businessEmail && <a
                  href={`mailto:${businessConfig.businessEmail}`}
                  className="flex items-center gap-3 text-ink-secondary hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center group-hover:bg-brand-purple-500/10 transition-colors">
                    <Mail className="w-5 h-5 text-brand-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{t('contact.emailLabel')}</p>
                    <p className="text-sm">{businessConfig.businessEmail}</p>
                  </div>
                </a>}

                {whatsappUrl && <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-secondary hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center group-hover:bg-green-600/10 transition-colors">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{t('contact.phoneLabel')}</p>
                    <p className="text-sm">{businessConfig.whatsapp ? formatSaudiPhone(businessConfig.whatsapp, locale) : t('contact.whatsapp')}</p>
                  </div>
                </a>}

                {businessConfig.workingHours[locale] && <div className="flex items-center gap-3 text-ink-secondary">
                  <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{t('common.hours')}</p>
                    <p className="text-sm">{businessConfig.workingHours[locale]}</p>
                  </div>
                </div>}

                <div className="flex items-center gap-3 text-ink-secondary">
                  <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted">{t('contact.countriesServed')}</p>
                    <p className="text-sm leading-6">{businessConfig.supportedCities[locale].join(locale === 'ar' ? '، ' : ', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
