'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-24">
      <div className="w-full max-w-lg rounded-3xl border border-rose-500/20 bg-surface-card p-8 text-center shadow-2xl shadow-black/20 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10">
          <AlertTriangle className="h-7 w-7 text-rose-400" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">{ar ? 'تعذر تحميل الصفحة' : 'We could not load this page'}</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          {ar ? 'قد تكون خدمة المحتوى غير متاحة مؤقتاً. بياناتك محفوظة، حاول مرة أخرى.' : 'The content service may be temporarily unavailable. Your data is safe; try the request again.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-purple-500/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-400"
        >
          <RotateCcw className="h-4 w-4" /> {ar ? 'حاول مرة أخرى' : 'Try again'}
        </button>
      </div>
    </main>
  );
}
