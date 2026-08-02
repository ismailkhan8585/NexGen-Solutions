'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientText } from '@/components/ui/gradient-text';
import { COMPANY_EMAIL, WHATSAPP_URL, SOCIAL_LINKS } from '@/lib/constants';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, Globe } from 'lucide-react';

export function Footer() {
  const { t, locale } = useI18n();

  const serviceLinks = [
    { label: t('services.web'), href: `/${locale}#services` },
    { label: t('services.app'), href: `/${locale}#services` },
    { label: t('services.ecommerce'), href: `/${locale}#services` },
    { label: t('services.ai'), href: `/${locale}#services` },
    { label: t('services.saas'), href: `/${locale}#services` },
  ];

  const companyLinks = [
    { label: t('footer.about'), href: `/${locale}/about` },
    { label: t('footer.team'), href: `/${locale}/team` },
    { label: t('footer.work'), href: `/${locale}/work` },
    { label: t('footer.blog'), href: `/${locale}/blog` },
    { label: t('footer.pricing'), href: `/${locale}/pricing` },
  ];

  const resourceLinks = [
    { label: t('footer.blog'), href: `/${locale}/blog` },
    { label: t('footer.contact'), href: `/${locale}/contact` },
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.terms'), href: '#' },
  ];

  const socials = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-surface border-t border-surface-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 flex items-center justify-center font-display font-bold text-white text-lg">
                NG
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg">
                  NexGen
                </span>{' '}
                <span className="text-ink-secondary text-lg">Solutions</span>
              </div>
            </div>
            <p className="text-ink-secondary text-sm max-w-xs mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-ink-secondary hover:text-white hover:border-surface-borderHover transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink-secondary hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink-secondary hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              {t('footer.contactCol')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-center gap-2 text-ink-secondary hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink-secondary hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +92 300 0000000
                </a>
              </li>
              <li className="flex items-center gap-2 text-ink-secondary text-sm">
                <Globe className="w-4 h-4 shrink-0" />
                nexgensolutions.agency
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted text-sm">
            &copy; 2025 NexGen Solutions. {t('footer.rights')}
          </p>
          <p className="text-ink-muted text-sm">
            {t('footer.builtWith')}{' '}
            <GradientText className="font-display">NexGen</GradientText>
          </p>
        </div>
      </div>
    </footer>
  );
}
