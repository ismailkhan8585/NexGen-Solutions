import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { ProjectEstimator } from '@/components/sections/project-estimator';
import { ConsultationBooking } from '@/components/sections/consultation-booking';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return params.locale === 'ar' ? { title: 'تقدير المشاريع', description: 'تقديرات مخصصة بالريال السعودي بعد مراجعة نطاق المشروع.' } : { title: 'Project Estimates', description: 'Custom project estimates in SAR after scope review.' };
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Pricing />
        <ProjectEstimator />
        <ConsultationBooking />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
