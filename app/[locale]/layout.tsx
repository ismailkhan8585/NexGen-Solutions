import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/constants";
import { I18nProvider } from "@/components/i18n-provider";
import { getDir, type Locale } from "@/lib/i18n";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { CookieNotice } from "@/components/layout/cookie-notice";

const messages = { en, ar } as const;

function getClientMessages(locale: Locale) {
  const source = messages[locale];
  return {
    nav: source.nav,
    hero: { cta_whatsapp: source.hero.cta_whatsapp },
    services: source.services,
    techstack: source.techstack,
    pricing: { badge: source.pricing.badge },
    contact: source.contact,
    footer: { rights: source.footer.rights },
    common: source.common,
    saudi: source.saudi,
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();

  const dir = getDir(locale);

  return (
    <I18nProvider
      initialLocale={locale}
      initialMessages={getClientMessages(locale)}
    >
      <div dir={dir} className="min-h-screen bg-surface pb-20 md:pb-0">
        {children}
        <MobileActionBar />
        <CookieNotice />
      </div>
    </I18nProvider>
  );
}
