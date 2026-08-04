import { Quote, Star } from 'lucide-react';
import { GradientBadge } from '@/components/ui/gradient-badge';
import type { Locale } from '@/lib/i18n';
import { serverTranslate } from '@/lib/server-translations';

export interface TestimonialData {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  reviewEn: string;
  reviewAr: string | null;
  rating: number;
}

export function Testimonials({ testimonials, locale }: { testimonials: TestimonialData[]; locale: Locale }) {
  const t = (key: string) => serverTranslate(locale, key);

  return (
    <section className="section-padding relative bg-surface">
      <div className="container-max relative z-10">
        <div className="mb-16 text-center">
          <GradientBadge className="mb-4">{t('testimonials.badge')}</GradientBadge>
          <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('testimonials.title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-secondary">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]">
              <Quote className="absolute end-4 top-4 h-10 w-10 text-brand-purple-500/20" fill="currentColor" aria-hidden="true" />
              <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} / 5`}>
                {Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} className="h-4 w-4 text-gold-400" fill="currentColor" />)}
              </div>
              <blockquote className="relative z-10 mb-6 text-sm leading-relaxed text-ink-secondary">
                &ldquo;{locale === 'ar' ? testimonial.reviewAr : testimonial.reviewEn}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-cyan-500/15 font-display text-sm font-bold text-brand-cyan-200" aria-hidden="true">
                  {testimonial.clientName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{testimonial.clientName}</p>
                  <p className="text-xs text-ink-muted">
                    {testimonial.clientRole}{testimonial.clientCompany ? ` · ${testimonial.clientCompany}` : ''}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
