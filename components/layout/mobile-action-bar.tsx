'use client';
import Link from 'next/link';
import { MessageCircle, Phone, Send } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { businessConfig, getWhatsAppUrl, normalizeSaudiPhone } from '@/lib/business-config';

export function MobileActionBar() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const whatsapp = getWhatsAppUrl(locale);
  const columns = businessConfig.phone && whatsapp ? 'grid-cols-3' : businessConfig.phone || whatsapp ? 'grid-cols-2' : 'grid-cols-1';
  return <nav aria-label={ar ? 'إجراءات التواصل السريعة' : 'Quick contact actions'} className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-border bg-surface/95 px-3 py-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,.3)] backdrop-blur-xl md:hidden"><div className={`mx-auto grid max-w-md gap-2 ${columns}`}>{businessConfig.phone && <a href={`tel:+${normalizeSaudiPhone(businessConfig.phone)}`} className="inline-flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-surface-border text-xs font-medium text-white"><Phone className="h-4 w-4" aria-hidden="true"/>{ar ? 'اتصال' : 'Call'}</a>}{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl bg-green-600 text-xs font-medium text-white"><MessageCircle className="h-4 w-4" aria-hidden="true"/>{ar ? 'واتساب' : 'WhatsApp'}</a>}<Link href={`/${locale}/contact`} className="inline-flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl bg-white text-xs font-semibold text-surface"><Send className="h-4 w-4" aria-hidden="true"/>{ar ? 'اطلب عرضاً' : 'Request quote'}</Link></div></nav>;
}
