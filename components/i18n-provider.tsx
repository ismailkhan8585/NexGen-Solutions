"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/i18n";

type Messages = Record<string, Record<string, unknown>>;

interface I18nContextValue {
  locale: Locale;
  t: (key: string, params?: Record<string, string>) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

function interpolate(str: string, params?: Record<string, string>): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
}

export function I18nProvider({
  children,
  initialLocale,
  initialMessages,
}: {
  children: ReactNode;
  initialLocale: Locale;
  initialMessages: Messages;
}) {
  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      const value = getNested(initialMessages, key);
      if (typeof value === "string") return interpolate(value, params);
      return key;
    },
    [initialMessages],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: initialLocale,
      t,
      dir: initialLocale === "ar" ? "rtl" : "ltr",
    }),
    [initialLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
