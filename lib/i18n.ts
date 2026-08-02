import { LOCALES, DEFAULT_LOCALE } from './constants';

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLocale(pathname: string): Locale {
  const segments = pathname.split('/');
  const candidate = segments[1];
  if (isLocale(candidate)) return candidate;
  return DEFAULT_LOCALE as Locale;
}

export function isRTL(locale: string): boolean {
  return locale === 'ar';
}

export function getDir(locale: string): 'rtl' | 'ltr' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
