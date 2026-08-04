import { LegalPage } from '@/components/legal-page'; import { legalContent } from '@/lib/legal-content'; import { localizedMetadata } from '@/lib/seo'; import type { PublicLocale } from '@/lib/business-config';
export async function generateMetadata(props:{params: Promise<{locale:PublicLocale}>}) {
  const params = await props.params;
  const p=legalContent['cookie-policy'];return localizedMetadata(params.locale,'cookie-policy',p.title[params.locale],p.description[params.locale])
} export default async function Page(props:{params: Promise<{locale:PublicLocale}>}) {
  const params = await props.params;
  return <LegalPage locale={params.locale} slug="cookie-policy"/>
}
