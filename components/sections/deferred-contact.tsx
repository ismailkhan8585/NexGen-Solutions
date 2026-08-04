'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import type { Locale } from '@/lib/i18n';

export function DeferredContact({ locale }: { locale: Locale }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [ContactComponent, setContactComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    let active = true;
    const load = () => {
      void import('@/components/sections/contact').then((module) => {
        if (active) setContactComponent(() => module.Contact);
      });
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return () => { active = false; };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: '800px 0px' },
    );
    observer.observe(trigger);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  if (ContactComponent) return <ContactComponent />;

  return (
    <div ref={triggerRef} id="contact" className="section-padding bg-surface" aria-busy="true">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-surface-border bg-surface-card px-6 py-14 text-center sm:px-10">
          <p className="section-kicker">{locale === 'ar' ? 'تواصل معنا' : 'Contact us'}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {locale === 'ar' ? 'أخبرنا عن مشروعك' : 'Tell us about your project'}
          </h2>
          <p className="mt-4 text-sm text-ink-secondary">
            {locale === 'ar' ? 'يتم تجهيز نموذج الطلب…' : 'Preparing the project enquiry form…'}
          </p>
        </div>
      </div>
    </div>
  );
}
