import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Contact } from '@/components/sections/contact';
import { FAQ } from '@/components/sections/faq';
import { localizedMetadata } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return localizedMetadata(
    locale,
    'contact',
    locale === 'ar' ? 'تواصل معنا' : 'Contact',
    locale === 'ar' ? 'أرسل تفاصيل مشروعك الرقمي إلى نيكس جين سولوشنز.' : 'Share your digital project requirements with NexGen Solutions.',
  );
}

export default function ContactPage() {
  return <><Navbar /><main className="pt-[72px]"><Contact /><FAQ /></main><Footer /><FloatingWhatsApp /></>;
}
