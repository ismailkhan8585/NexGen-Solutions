import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Contact } from '@/components/sections/contact';
import { FAQ } from '@/components/sections/faq';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return params.locale === 'ar' ? { title: 'تواصل معنا', description: 'أرسل تفاصيل مشروعك الرقمي إلى نيكس جين سولوشنز.' } : { title: 'Contact', description: 'Share your digital project requirements with NexGen Solutions.' };
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
