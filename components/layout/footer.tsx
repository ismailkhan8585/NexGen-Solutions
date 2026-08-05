'use client';

import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { businessConfig, formatSaudiPhone, getWhatsAppUrl } from '@/lib/business-config';
import { BrandMark } from '@/components/brand/brand-mark';

export function Footer() {
  const { t, locale } = useI18n();
  const ar = locale === 'ar';
  const whatsapp = getWhatsAppUrl(locale);
  const socials = [
    { icon: Linkedin, href: businessConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: businessConfig.social.instagram, label: 'Instagram' },
    { icon: Twitter, href: businessConfig.social.x, label: 'X' },
    { icon: Github, href: businessConfig.social.github, label: 'GitHub' },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));
  const services = [
    { label: ar ? 'تطوير المواقع' : 'Website development', href: `/${locale}/services/web` },
    { label: ar ? 'التجارة الإلكترونية' : 'E-commerce solutions', href: `/${locale}/services/ecommerce` },
    { label: ar ? 'تطبيقات الجوال' : 'Mobile applications', href: `/${locale}/services/app` },
    { label: ar ? 'البرمجيات المخصصة' : 'Custom software', href: `/${locale}/services/software` },
  ];
  const industries = [
    { label: ar ? 'العقارات' : 'Real estate', href: `/${locale}/industries/real-estate` },
    { label: ar ? 'المطاعم والضيافة' : 'Restaurants & hospitality', href: `/${locale}/industries/restaurant-pos` },
    { label: ar ? 'التجزئة والتجارة' : 'Retail & e-commerce', href: `/${locale}/industries/retail-ecommerce` },
    { label: ar ? 'الخدمات المهنية' : 'Professional services', href: `/${locale}/industries/professional-services` },
  ];
  const company = [
    { label: ar ? 'عن الشركة' : 'About the company', href: `/${locale}/about` },
    { label: ar ? 'أعمالنا' : 'Selected work', href: `/${locale}/work` },
    { label: ar ? 'المعرفة' : 'Insights', href: `/${locale}/blog` },
    { label: ar ? 'الدعم والصيانة' : 'Support & maintenance', href: `/${locale}/support` },
  ];
  const legal = [
    { href: `/${locale}/privacy-policy`, label: ar ? 'الخصوصية' : 'Privacy' },
    { href: `/${locale}/terms-and-conditions`, label: ar ? 'الشروط' : 'Terms' },
    { href: `/${locale}/cookie-policy`, label: ar ? 'ملفات الارتباط' : 'Cookies' },
    { href: `/${locale}/refund-cancellation-policy`, label: ar ? 'الإلغاء والاسترداد' : 'Cancellation' },
  ];
  const contactAvailable = businessConfig.businessEmail || businessConfig.phone || whatsapp || businessConfig.address[locale];

  return (
    <footer className="border-t border-surface-border bg-[#070809]">
      <div className="container-max px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1"><Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={t('common.homeLabel')}><BrandMark label={`${businessConfig.companyName[locale]} logo`} /><span className="font-display text-lg font-bold text-white">{businessConfig.companyName[locale]}</span></Link><p className="mt-5 max-w-sm text-sm leading-7 text-ink-secondary">{ar ? 'منتجات رقمية تبدأ بالعربية، مصممة للأعمال في السعودية بتركيز على الأداء والوضوح وقابلية التطوير.' : 'Arabic-first digital products for Saudi businesses, designed for performance, clarity, and long-term maintainability.'}</p><div className="mt-6"><LanguageToggle /></div>{socials.length > 0 && <div className="mt-5 flex gap-2">{socials.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border text-ink-secondary transition hover:border-brand-cyan-500/30 hover:text-white"><Icon className="h-4 w-4" /></a>)}</div>}</div>
          <FooterColumn title={ar ? 'الخدمات' : 'Services'} links={services} />
          <FooterColumn title={ar ? 'القطاعات' : 'Industries'} links={industries} />
          <FooterColumn title={ar ? 'الشركة' : 'Company'} links={company} />
          <div><h2 className="font-display text-sm font-semibold text-white">{ar ? 'التواصل' : 'Contact'}</h2>{contactAvailable ? <ul className="mt-5 space-y-4 text-sm text-ink-secondary">{businessConfig.businessEmail && <li><a href={`mailto:${businessConfig.businessEmail}`} className="flex items-start gap-2.5 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0" />{businessConfig.businessEmail}</a></li>}{businessConfig.phone && <li><a href={`tel:+${businessConfig.phone.replace(/\D/g, '')}`} className="flex items-center gap-2.5 hover:text-white"><Phone className="h-4 w-4 shrink-0" />{formatSaudiPhone(businessConfig.phone, locale)}</a></li>}{whatsapp && !businessConfig.phone && <li><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white"><Phone className="h-4 w-4 shrink-0" />WhatsApp</a></li>}{businessConfig.address[locale] && <li><span className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{businessConfig.address[locale]}</span></li>}</ul> : <Link href={`/${locale}/contact`} className="mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-cyan-300 hover:text-brand-cyan-200">{ar ? 'أرسل طلب مشروع' : 'Send a project enquiry'}</Link>}{(businessConfig.crNumber || businessConfig.vatNumber) && <dl className="mt-6 space-y-2 border-t border-surface-border pt-5 text-xs text-ink-muted">{businessConfig.crNumber && <div><dt className="inline">{ar ? 'السجل التجاري' : 'CR'}: </dt><dd className="inline">{businessConfig.crNumber}</dd></div>}{businessConfig.vatNumber && <div><dt className="inline">{ar ? 'الرقم الضريبي' : 'VAT'}: </dt><dd className="inline">{businessConfig.vatNumber}</dd></div>}</dl>}</div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-surface-border pt-7 text-sm text-ink-muted lg:flex-row lg:items-center lg:justify-between"><p>&copy; {new Date().getFullYear()} {businessConfig.companyName[locale]}. {t('footer.rights')}</p><nav aria-label={ar ? 'الروابط القانونية' : 'Legal links'} className="flex flex-wrap gap-x-5 gap-y-2">{legal.map((item) => <Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>)}</nav></div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return <div><h2 className="font-display text-sm font-semibold text-white">{title}</h2><ul className="mt-5 space-y-3.5">{links.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-ink-secondary transition hover:text-white">{item.label}</Link></li>)}</ul></div>;
}
