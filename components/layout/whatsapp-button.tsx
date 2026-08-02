'use client';

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useI18n } from '@/components/i18n-provider';
import { getWhatsAppUrl, type WhatsAppContext } from '@/lib/business-config';
import { cn } from '@/lib/utils';

export function WhatsAppButton({
  className,
  label,
  context,
}: {
  className?: string;
  label?: string;
  context?: WhatsAppContext;
}) {
  const { locale } = useI18n();
  const whatsappUrl = getWhatsAppUrl(locale, context);
  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400',
        'bg-green-600 text-white px-5 py-3',
        'hover:bg-green-500 hover:shadow-lg hover:shadow-green-600/20',
        'active:scale-95',
        className
      )}
    >
      <WhatsAppIcon className="w-5 h-5" />
      {label}
    </a>
  );
}
