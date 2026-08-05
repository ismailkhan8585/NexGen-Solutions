"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { GradientButton } from "@/components/ui/gradient-button";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { BrandMark } from "@/components/brand/brand-mark";
import { businessConfig, getWhatsAppUrl } from "@/lib/business-config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { t, locale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = getWhatsAppUrl(locale);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: `/${locale}/services`, label: t("nav.services") },
    {
      href: `/${locale}/industries`,
      label: locale === "ar" ? "القطاعات" : "Industries",
    },
    { href: `/${locale}/work`, label: t("nav.work") },
    { href: `/${locale}/about`, label: locale === "ar" ? "الشركة" : "Company" },
    {
      href: `/${locale}/blog`,
      label: locale === "ar" ? "المعرفة" : "Insights",
    },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 h-[72px] border-b border-surface-border bg-surface/95 shadow-[0_14px_40px_-28px_rgba(0,0,0,.9)]">
        <nav className="container-max flex h-full w-full min-w-0 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="flex min-w-0 shrink items-center gap-2"
            aria-label={t("common.homeLabel")}
          >
            <BrandMark
              size="sm"
              label={`${businessConfig.companyName[locale]} logo`}
            />
            <span className="hidden max-w-[180px] truncate font-display font-bold text-white sm:block">
              {businessConfig.companyName[locale]}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    active
                      ? "text-white"
                      : "text-ink-secondary hover:text-white",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 start-0 h-0.5 bg-brand-cyan-400 transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <Link href={`/${locale}/contact`} className="hidden md:inline-flex">
              <GradientButton className="text-sm px-4 py-2">
                {t("nav.getQuote")}
              </GradientButton>
            </Link>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.whatsapp")}
                className="hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-green-600 text-white hover:bg-green-500 transition-colors"
              >
                <span aria-hidden="true" className="text-sm font-bold">
                  WA
                </span>
              </a>
            )}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-surface-border text-ink-primary"
              aria-label={t("common.openMenu")}
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
            className="mobile-menu-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
            className="mobile-menu-panel absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface border-l border-surface-border p-6 flex flex-col shadow-2xl shadow-black/40 rtl:left-0 rtl:right-auto rtl:border-l-0 rtl:border-r"
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                href={`/${locale}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
                aria-label={t("common.homeLabel")}
              >
                <BrandMark
                  size="sm"
                  tone="dark"
                  label={`${businessConfig.companyName[locale]} logo`}
                />
                <span className="font-display text-sm font-bold text-white">
                  {businessConfig.companyName[locale]}
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-xl border border-surface-border flex items-center justify-center text-ink-primary"
                aria-label={t("common.closeMenu")}
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
                  aria-current={
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`)
                      ? "page"
                      : undefined
                  }
                  className={cn(
                    "min-h-[48px] rounded-xl px-4 py-3 font-medium transition-colors",
                    pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)
                      ? "bg-surface-hover text-white"
                      : "text-ink-secondary hover:bg-surface-hover hover:text-white",
                  )}
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
                  window.location.href = `/${locale}/contact`;
                }}
              >
                {t("nav.getQuote")}
              </GradientButton>
              <WhatsAppButton
                className="w-full"
                label={t("hero.cta_whatsapp")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
