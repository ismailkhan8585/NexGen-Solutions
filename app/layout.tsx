import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { businessConfig } from '@/lib/business-config';
import { JsonLd, organizationSchema } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const locale = headers().get('x-site-locale') === 'en' ? 'en' : 'ar';
  const isArabic = locale === 'ar';
  const title = isArabic
    ? 'نيكس جين سولوشنز | حلول رقمية للأعمال في السعودية'
    : 'NexGen Solutions | Digital Solutions for Saudi Businesses';
  const description = isArabic
    ? 'نصمم ونطور مواقع وتطبيقات ومنصات رقمية عربية تلائم احتياجات الأعمال في المملكة العربية السعودية.'
    : 'Arabic-first websites, applications, e-commerce platforms, and custom software for businesses across Saudi Arabia.';

  return {
    title: { default: title, template: `%s | ${businessConfig.companyName[locale]}` },
    description,
    metadataBase: new URL(businessConfig.appUrl),
    alternates: {
      languages: { 'ar-SA': '/ar', 'en-SA': '/en' },
    },
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_SA' : 'en_SA',
      alternateLocale: isArabic ? 'en_SA' : 'ar_SA',
      url: businessConfig.appUrl,
      siteName: businessConfig.companyName[locale],
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = headers().get('x-site-locale') === 'en' ? 'en' : 'ar';
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="font-body antialiased">
        <JsonLd data={{ '@context': 'https://schema.org', ...organizationSchema(locale) }} />
        {children}
      </body>
    </html>
  );
}
