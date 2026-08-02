'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { Star, Quote } from 'lucide-react';

export interface TestimonialData {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  clientCountry: string | null;
  reviewEn: string;
  reviewAr: string | null;
  rating: number;
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  const { t, locale } = useI18n();

  return (
    <section className="section-padding bg-surface relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('testimonials.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-14 text-center">
              <p className="font-display font-semibold text-white">{t('common.empty')}</p>
            </div>
          )}
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-brand-purple-500/20" fill="currentColor" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-ink-secondary text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{locale === 'ar' ? testimonial.reviewAr ?? testimonial.reviewEn : testimonial.reviewEn}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 flex items-center justify-center text-white font-display font-bold text-sm">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {testimonial.clientName}
                    </p>
                    <p className="text-ink-muted text-xs">
                      {testimonial.clientRole}
                      {testimonial.clientCompany ? ` · ${testimonial.clientCompany}` : ''}
                      {testimonial.clientCountry ? ` · ${testimonial.clientCountry}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
