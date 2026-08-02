import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Contact } from '@/components/sections/contact';
import { FAQ } from '@/components/sections/faq';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with NexGen Solutions. We reply within 2 hours.',
};

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
