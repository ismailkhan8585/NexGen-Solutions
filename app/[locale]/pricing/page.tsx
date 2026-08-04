import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { ProjectEstimator } from '@/components/sections/project-estimator';
import { ConsultationBooking } from '@/components/sections/consultation-booking';
import { localizedMetadata } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return localizedMetadata(
    locale,
    'pricing',
    locale === 'ar' ? 'تقدير المشاريع' : 'Project Estimates',
    locale === 'ar' ? 'تقديرات مخصصة بالريال السعودي بعد مراجعة نطاق المشروع.' : 'Custom project estimates in SAR after scope review.',
  );
}

export default async function PricingPage(props: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const { locale } = await props.params;
  return <><Navbar /><main className="pt-[72px]"><Pricing /><ProjectEstimator /><ConsultationBooking /><FAQ locale={locale} /></main><Footer /><FloatingWhatsApp /></>;
}
