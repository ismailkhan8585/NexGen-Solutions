"use client";

import Link from "next/link";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import type { Locale } from "@/lib/i18n";

class ContactErrorBoundary extends Component<
  { locale: Locale; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The visitor receives recovery actions below; production monitoring can be added later.
  }

  reset = () => this.setState({ failed: false });

  render() {
    if (!this.state.failed) return this.props.children;
    const ar = this.props.locale === "ar";
    return (
      <section
        id="contact"
        className="section-padding min-h-[760px] bg-surface"
        aria-live="polite"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-3xl rounded-3xl border border-surface-border bg-surface-card px-6 py-12 text-center sm:px-10"
            role="alert"
          >
            <AlertCircle
              className="mx-auto h-7 w-7 text-amber-300"
              aria-hidden="true"
            />
            <h2 className="mt-4 font-display text-3xl font-bold text-white">
              {ar
                ? "تعذر تحميل النموذج الآن."
                : "The form could not be loaded right now."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink-secondary">
              {ar
                ? "يمكنك إعادة المحاولة أو التواصل معنا عبر صفحة الاتصال أو واتساب."
                : "Try again, or reach us through the contact page or WhatsApp."}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={this.reset}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-surface-border px-5 font-semibold text-white hover:bg-surface-hover"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {ar ? "إعادة المحاولة" : "Try again"}
              </button>
              <Link
                href={`/${this.props.locale}/contact`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-5 font-semibold text-surface"
              >
                {ar ? "صفحة الاتصال" : "Contact page"}
              </Link>
              <WhatsAppButton label={ar ? "واتساب" : "WhatsApp"} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export function DeferredContact({ locale }: { locale: Locale }) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [ContactComponent, setContactComponent] =
    useState<ComponentType | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    let active = true;
    const load = () => {
      void import("@/components/sections/contact")
        .then((module) => {
          if (active) setContactComponent(() => module.Contact);
        })
        .catch(() => {
          if (active) setLoadFailed(true);
        });
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return () => {
        active = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(trigger);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  if (loadFailed) {
    return (
      <ContactErrorBoundary locale={locale}>
        <LoadFailure />
      </ContactErrorBoundary>
    );
  }

  if (ContactComponent) {
    return (
      <ContactErrorBoundary locale={locale}>
        <ContactComponent />
      </ContactErrorBoundary>
    );
  }

  return (
    <section
      ref={triggerRef}
      id="contact"
      className="section-padding min-h-[760px] bg-surface"
      aria-busy="true"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-surface-border bg-surface-card px-6 py-12 text-center sm:px-10">
          <p className="section-kicker">
            {locale === "ar" ? "تواصل معنا" : "Contact us"}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {locale === "ar"
              ? "أخبرنا عن مشروعك"
              : "Tell us about your project"}
          </h2>
          <p className="mt-5 text-sm text-ink-secondary" role="status">
            {locale === "ar" ? "جارٍ تفعيل النموذج…" : "Activating the form…"}
          </p>
        </div>
      </div>
    </section>
  );
}

function LoadFailure(): never {
  throw new Error("The contact form chunk could not be loaded.");
}
