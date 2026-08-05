import type { PublicLocale } from '@/lib/business-config';

type Localized = Readonly<Record<PublicLocale, string>>;

export type CredibilityItem = {
  key: 'bilingual' | 'milestones' | 'engineering' | 'support';
  title: Localized;
  description: Localized;
};

export type PublishableCredential = {
  id: string;
  label: Localized;
  value: string;
  verifiedAt?: string;
};

export type PublishableProfile = {
  id: string;
  name: string;
  role: Localized;
  imageUrl?: string;
  published: boolean;
};

export type PublishableTestimonial = {
  id: string;
  quote: Localized;
  attribution: string;
  publicationApproved: boolean;
};

export const credibilityConfig = {
  eyebrow: { ar: 'أساس شراكة واضحة', en: 'A dependable delivery foundation' },
  title: { ar: 'ثقة مبنية على طريقة العمل، لا على أرقام غير موثقة', en: 'Credibility built through how the work is delivered' },
  items: [
    {
      key: 'bilingual',
      title: { ar: 'مصمم للجمهور العربي والإنجليزي', en: 'Built for Arabic and English audiences' },
      description: { ar: 'تجربة RTL عربية أصلية مع مسار إنجليزي متكامل، من المحتوى إلى النماذج والبيانات الوصفية.', en: 'Native Arabic RTL and complete English LTR journeys, from content and forms to metadata.' },
    },
    {
      key: 'milestones',
      title: { ar: 'مراحل واضحة وتحديثات منتظمة', en: 'Clear milestones and regular updates' },
      description: { ar: 'نقاط مراجعة محددة تجعل القرارات وحالة التنفيذ والخطوة التالية واضحة للفريق.', en: 'Defined review points keep decisions, delivery status, and next actions visible to your team.' },
    },
    {
      key: 'engineering',
      title: { ar: 'أسس تقنية تراعي الأمان والتوسع', en: 'Security-aware, scalable foundations' },
      description: { ar: 'نراعي الأداء والإتاحة والأمان وقابلية الصيانة منذ تحديد البنية وحتى الإطلاق.', en: 'Performance, accessibility, security, and maintainability guide architecture through launch.' },
    },
    {
      key: 'support',
      title: { ar: 'دعم متفق عليه بعد الإطلاق', en: 'Agreed post-launch support' },
      description: { ar: 'نحدد نطاق الصيانة والمراقبة والتحسين حسب احتياج المنتج واتفاقية الخدمة.', en: 'Maintenance, monitoring, and improvement are scoped around the product and agreed service needs.' },
    },
  ] satisfies readonly CredibilityItem[],
  // Intentionally empty until verified evidence and publication permission are supplied.
  clientLogos: [] as readonly { name: string; imageUrl: string }[],
  metrics: [] as readonly { value: string; label: Localized }[],
  certifications: [] as readonly { name: string; imageUrl?: string }[],
  credentials: [] as readonly PublishableCredential[],
  teamProfiles: [] as readonly PublishableProfile[],
  testimonials: [] as readonly PublishableTestimonial[],
} as const;
