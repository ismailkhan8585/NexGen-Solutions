'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { GradientButton } from '@/components/ui/gradient-button';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { businessConfig, getWhatsAppUrl } from '@/lib/business-config';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: `/${locale}/services`, label: t('nav.services') },
    { href: `/${locale}/work`, label: t('nav.work') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/team`, label: t('nav.team') },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300',
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-surface-border'
            : 'bg-transparent'
        )}
      >
        <nav className="container-max h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0" aria-label={t('common.homeLabel')}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-display font-bold text-surface text-lg">
              NG
            </div>
            <span className="hidden max-w-[180px] truncate font-display font-bold text-white sm:block">{businessConfig.companyName[locale]}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-secondary hover:text-white transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <Link
              href={`/${locale}#contact`}
              className="hidden md:inline-flex"
            >
              <GradientButton className="text-sm px-4 py-2">
                {t('nav.getQuote')}
              </GradientButton>
            </Link>
            {whatsappUrl && <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.whatsapp')}
              className="hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-green-600 text-white hover:bg-green-500 transition-colors"
            >
              <span aria-hidden="true" className="text-sm font-bold">WA</span>
            </a>}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-surface-border text-ink-primary"
              aria-label={t('common.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Main navigation" className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface border-l border-surface-border p-6 flex flex-col shadow-2xl shadow-black/40 rtl:left-0 rtl:right-auto rtl:border-l-0 rtl:border-r">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display font-bold text-white text-lg">{t('common.menu')}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-xl border border-surface-border flex items-center justify-center text-ink-primary"
                aria-label={t('common.closeMenu')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-ink-secondary hover:text-white hover:bg-surface-hover transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <LanguageToggle />
              <GradientButton
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.href = `/${locale}#contact`;
                }}
              >
                {t('nav.getQuote')}
              </GradientButton>
              <WhatsAppButton className="w-full" label={t('hero.cta_whatsapp')} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
