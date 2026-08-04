import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale } from '@/lib/i18n';

const messages = { en, ar } as const;

export function serverTranslate(locale: Locale, key: string): string {
  let value: unknown = messages[locale];

  for (const segment of key.split('.')) {
    if (!value || typeof value !== 'object' || !(segment in value)) return key;
    value = (value as Record<string, unknown>)[segment];
  }

  return typeof value === 'string' ? value : key;
}
