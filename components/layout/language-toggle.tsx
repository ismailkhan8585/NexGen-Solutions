'use client';

import { useI18n } from '@/components/i18n-provider';
import { usePathname, useRouter } from 'next/navigation';
import { LOCALES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: typeof locale) {
    if (nextLocale === locale) return;
    setLocale(nextLocale);
    const nextPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
    router.push(`${nextPath}${window.location.hash}`);
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-surface-border bg-surface-card p-0.5',
        className
      )}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => changeLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={loc === 'en' ? 'Switch to English' : 'التبديل إلى العربية'}
          className={cn(
            'px-3 py-1 text-sm font-medium rounded-full transition-all',
            locale === loc
              ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white'
              : 'text-ink-secondary hover:text-ink-primary'
          )}
        >
          {loc === 'en' ? 'English' : 'العربية'}
        </button>
      ))}
    </div>
  );
}
