import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for web development, mobile apps, and software solutions.',
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
