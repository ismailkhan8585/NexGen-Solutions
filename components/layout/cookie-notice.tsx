'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useI18n } from '@/components/i18n-provider';

const STORAGE_KEY = 'nexgen-essential-cookie-notice-v1';

export function CookieNotice() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { setVisible(localStorage.getItem(STORAGE_KEY) !== 'dismissed'); }
    catch { setVisible(true); }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, 'dismissed'); }
    catch { /* The notice still closes for this page view. */ }
    setVisible(false);
  }

  return (
    <aside className="fixed inset-x-3 bottom-20 z-[90] mx-auto max-w-3xl rounded-2xl border border-surface-border bg-surface-card p-4 shadow-2xl md:bottom-4" aria-label={ar ? 'إشعار ملفات الارتباط' : 'Cookie notice'}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-6 text-ink-secondary">
          {ar ? 'يستخدم الموقع فقط التخزين وملفات الارتباط الضرورية للتشغيل الآمن وتسجيل دخول الإدارة وحفظ مسودة نموذجك محلياً. لا توجد تحليلات أو إعلانات اختيارية مفعلة حالياً.' : 'This site currently uses only storage and cookies needed for secure operation, admin sign-in, and saving your form draft locally. No optional analytics or advertising is enabled.'}{' '}
          <Link href={`/${locale}/cookie-policy`} className="text-brand-cyan-300 underline">{ar ? 'سياسة ملفات الارتباط' : 'Cookie policy'}</Link>
        </p>
        <button type="button" onClick={dismiss} className="min-h-[44px] shrink-0 rounded-xl bg-white px-5 text-sm font-semibold text-surface">{ar ? 'فهمت' : 'Got it'}</button>
      </div>
    </aside>
  );
}
