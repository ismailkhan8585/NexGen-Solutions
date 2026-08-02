import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/constants';
import { I18nProvider } from '@/components/i18n-provider';
import { getDir, type Locale } from '@/lib/i18n';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const messages = { en, ar } as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();

  const dir = getDir(locale);

  return (
    <I18nProvider initialLocale={locale} initialMessages={messages[locale]}>
      <div dir={dir} className="min-h-screen bg-surface">
        {children}
      </div>
    </I18nProvider>
  );
}
