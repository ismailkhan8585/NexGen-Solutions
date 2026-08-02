'use client';

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { WHATSAPP_URL } from '@/lib/constants';

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-500 transition-all hover:scale-110 active:scale-95 animate-pulse-glow"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
      <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20" />
    </a>
  );
}
