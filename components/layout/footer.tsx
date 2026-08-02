'use client';

import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { businessConfig, formatSaudiPhone, getWhatsAppUrl } from '@/lib/business-config';

export function Footer() {
  const { t, locale } = useI18n();
  const whatsappUrl = getWhatsAppUrl(locale);
  const socials = [
    { icon: Linkedin, href: businessConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: businessConfig.social.instagram, label: 'Instagram' },
    { icon: Twitter, href: businessConfig.social.x, label: 'X' },
    { icon: Github, href: businessConfig.social.github, label: 'GitHub' },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));
  const serviceLinks = [
    ['web', 'web'], ['ecommerce', 'ecommerce'], ['app', 'app'], ['software', 'software'], ['ai', 'ai'],
  ] as const;
  const companyLinks = [
    { label: t('footer.about'), href: `/${locale}/about` },
    { label: t('footer.work'), href: `/${locale}/work` },
    { label: t('footer.blog'), href: `/${locale}/blog` },
    { label: t('footer.contact'), href: `/${locale}/contact` },
  ];
  const legalLinks = [
    { href: `/${locale}/privacy-policy`, label: locale === 'ar' ? 'الخصوصية' : 'Privacy' },
    { href: `/${locale}/terms-and-conditions`, label: locale === 'ar' ? 'الشروط' : 'Terms' },
    { href: `/${locale}/cookie-policy`, label: locale === 'ar' ? 'ملفات الارتباط' : 'Cookies' },
    { href: `/${locale}/refund-cancellation-policy`, label: locale === 'ar' ? 'الإلغاء والاسترداد' : 'Cancellation' },
  ];

  return (
    <footer className="border-t border-surface-border bg-surface">
      <div className="container-max px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={t('common.homeLabel')}><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-display font-bold text-surface">NG</span><span className="font-display text-lg font-bold text-white">{businessConfig.companyName[locale]}</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-ink-secondary">{t('footer.tagline')}</p>
            {socials.length > 0 && <div className="mt-5 flex gap-2">{socials.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border text-ink-secondary transition hover:border-surface-borderHover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-400"><Icon className="h-4 w-4" /></a>)}</div>}
          </div>
          <div><h2 className="font-display text-sm font-semibold text-white">{t('footer.services')}</h2><ul className="mt-4 space-y-3">{serviceLinks.map(([slug, key]) => <li key={slug}><Link href={`/${locale}/services/${slug}`} className="text-sm text-ink-secondary transition hover:text-white">{t(`services.${key}`)}</Link></li>)}</ul></div>
          <div><h2 className="font-display text-sm font-semibold text-white">{t('footer.company')}</h2><ul className="mt-4 space-y-3">{companyLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-ink-secondary transition hover:text-white">{link.label}</Link></li>)}</ul></div>
          <div><h2 className="font-display text-sm font-semibold text-white">{t('footer.contactCol')}</h2><ul className="mt-4 space-y-3 text-sm text-ink-secondary">
            {businessConfig.businessEmail && <li><a href={`mailto:${businessConfig.businessEmail}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0" />{businessConfig.businessEmail}</a></li>}
            {businessConfig.phone && <li><a href={`tel:+${businessConfig.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0" />{formatSaudiPhone(businessConfig.phone, locale)}</a></li>}
            {whatsappUrl && !businessConfig.phone && <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0" />{t('contact.whatsapp')}</a></li>}
            {businessConfig.address[locale] && <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{businessConfig.address[locale]}</li>}
          </ul></div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-surface-border pt-7 text-sm text-ink-muted lg:flex-row lg:items-center lg:justify-between"><p>&copy; {new Date().getFullYear()} {businessConfig.companyName[locale]}. {t('footer.rights')}</p><nav aria-label={locale === 'ar' ? 'الروابط القانونية' : 'Legal links'} className="flex flex-wrap gap-x-4 gap-y-2">{legalLinks.map(item=><Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}</nav></div>
      </div>
    </footer>
  );
}
