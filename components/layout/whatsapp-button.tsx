'use client';

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { WHATSAPP_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function WhatsAppButton({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all',
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
