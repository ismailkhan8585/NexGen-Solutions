import type { PublicLocale } from '@/lib/business-config';
export const blogDraftIdeas = [
  { ar: 'كيف تختار شركة تطوير مواقع مناسبة لأعمالك في السعودية؟', en: 'How Saudi businesses can choose a website-development company' },
  { ar: 'موقع تعريفي أم منصة تجارة إلكترونية: كيف تختار؟', en: 'Website vs e-commerce platform: how to choose' },
  { ar: 'فوائد تصميم المواقع بالعربية أولاً', en: 'Benefits of Arabic-first website design' },
  { ar: 'ما الذي تحتاجه المطاعم السعودية من نظام نقاط البيع؟', en: 'What Saudi restaurants need from a POS system' },
  { ar: 'فرص أتمتة الذكاء الاصطناعي للأعمال الصغيرة', en: 'AI automation opportunities for small businesses' },
  { ar: 'العوامل التي تؤثر في تكلفة تطوير تطبيق جوال', en: 'Cost factors for mobile-app development' },
] as const satisfies readonly Record<PublicLocale, string>[];
