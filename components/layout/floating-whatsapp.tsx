'use client';

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useI18n } from '@/components/i18n-provider';
import { getWhatsAppUrl } from '@/lib/business-config';

export function FloatingWhatsApp() {
  const { locale, t } = useI18n();
  const whatsappUrl = getWhatsAppUrl(locale);
  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.whatsapp')}
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg shadow-green-600/25 transition hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 sm:bottom-6 sm:end-6"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}
