'use client';
import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';
export function ShareArticle({ title, url, locale }: { title: string; url: string; locale: 'ar' | 'en' }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); setStatus('copied'); }
    } catch (error) { if ((error as Error).name !== 'AbortError') setStatus('error'); }
  }
  return <div><button type="button" onClick={share} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-surface-border bg-surface-card px-4 py-2 text-sm text-ink-secondary transition hover:text-white">{status === 'copied' ? <Check className="h-4 w-4 text-emerald-400"/> : <Share2 className="h-4 w-4"/>}{status === 'copied' ? (locale === 'ar' ? 'تم نسخ الرابط' : 'Link copied') : (locale === 'ar' ? 'مشاركة' : 'Share')}</button>{status === 'error' && <p role="alert" className="mt-2 text-xs text-rose-400">{locale === 'ar' ? 'تعذرت المشاركة. يمكنك نسخ الرابط من شريط العنوان.' : 'Sharing was unavailable. You can copy the URL from the address bar.'}</p>}</div>;
}
