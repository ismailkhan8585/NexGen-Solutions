"use client";

import { useI18n } from "@/components/i18n-provider";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: typeof locale) {
    if (nextLocale === locale) return;
    const nextPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
    router.push(`${nextPath}${window.location.hash}`);
  }

  return (
    <div
      className={cn(
        "inline-flex min-h-[44px] items-center rounded-full border border-surface-border bg-surface p-1",
        className,
      )}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => changeLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={
            loc === "en" ? "Switch to English" : "التبديل إلى العربية"
          }
          className={cn(
            "min-h-[34px] rounded-full px-3 py-1 text-sm font-medium transition-colors",
            locale === loc
              ? "bg-white text-surface"
              : "text-ink-secondary hover:text-ink-primary",
          )}
        >
          {loc === "en" ? "English" : "العربية"}
        </button>
      ))}
    </div>
  );
}
