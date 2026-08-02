import type { Metadata } from 'next';
import { businessConfig, type PublicLocale } from '@/lib/business-config';

export function localizedMetadata(locale: PublicLocale, path: string, title: string, description: string): Metadata {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const canonical = `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
  const ar = `/ar${cleanPath ? `/${cleanPath}` : ''}`;
  const en = `/en${cleanPath ? `/${cleanPath}` : ''}`;
  return {
    title, description,
    alternates: { canonical, languages: { ar, en, 'x-default': ar } },
    openGraph: { type: 'website', locale: locale === 'ar' ? 'ar_SA' : 'en_SA', url: canonical, title, description, siteName: businessConfig.companyName[locale] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function organizationSchema(locale: PublicLocale) {
  return {
    '@type': 'Organization', name: businessConfig.companyName[locale], url: businessConfig.appUrl,
    ...(businessConfig.businessEmail ? { email: businessConfig.businessEmail } : {}),
    ...(businessConfig.phone ? { telephone: businessConfig.phone } : {}),
    sameAs: Object.values(businessConfig.social).filter(Boolean),
  };
}
