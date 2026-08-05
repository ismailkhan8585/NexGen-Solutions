"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

const STORAGE_KEY = "nexgen-cookie-consent-v2";
const LEGACY_KEY = "nexgen-essential-cookie-notice-v1";

type ConsentChoice = "accepted" | "rejected";

export function CookieNotice() {
  const { locale } = useI18n();
  const ar = locale === "ar";
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const legacy = localStorage.getItem(LEGACY_KEY);
      setVisible(!saved && legacy !== "dismissed");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function save(choice: ConsentChoice) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          necessary: true,
          optional: false,
          choice,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      /* The choice still applies for this page view. */
    }
    setVisible(false);
  }

  return (
    <aside
      className="fixed inset-x-3 bottom-20 z-[90] mx-auto max-w-4xl overflow-hidden rounded-2xl border border-surface-border bg-surface-card/95 p-3 shadow-2xl backdrop-blur-md md:bottom-4"
      role="region"
      aria-label={ar ? "إعدادات ملفات الارتباط" : "Cookie settings"}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="min-w-0 flex-1 text-xs leading-5 text-ink-secondary sm:text-sm">
          {ar
            ? "نستخدم التخزين الضروري فقط للأمان وتسجيل دخول الإدارة وحفظ مسودة النموذج. التحليلات والإعلانات الاختيارية متوقفة."
            : "We use essential storage only for security, admin sign-in, and form drafts. Optional analytics and advertising are off."}{" "}
          <Link
            href={`/${locale}/cookie-policy`}
            className="font-medium text-brand-cyan-300 underline underline-offset-2"
          >
            {ar ? "التفضيلات والسياسة" : "Preferences and policy"}
          </Link>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="min-h-[44px] rounded-xl border border-surface-border px-3 text-xs font-semibold text-white transition hover:bg-surface-hover sm:px-4"
          >
            {ar ? "رفض الاختياري" : "Reject optional"}
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="min-h-[44px] rounded-xl bg-white px-3 text-xs font-semibold text-surface transition hover:bg-cyan-50 sm:px-4"
          >
            {ar ? "قبول الضروري" : "Accept essentials"}
          </button>
        </div>
      </div>
    </aside>
  );
}
