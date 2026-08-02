import type { PublicLocale } from '@/lib/business-config';

export type EstimatorSelections = {
  projectType: keyof typeof estimatorConfig.projectTypes;
  units: number;
  complexity: keyof typeof estimatorConfig.complexity;
  bilingual: boolean;
  ecommerce: boolean;
  authentication: boolean;
  adminDashboard: boolean;
  payments: boolean;
  integrations: number;
  timeline: keyof typeof estimatorConfig.timeline;
};

type Option = { label: Record<PublicLocale, string>; min: number; max: number };

export const estimatorConfig = {
  projectTypes: {
    website: { label: { ar: 'موقع أعمال', en: 'Business website' }, min: 12000, max: 24000 },
    ecommerce: { label: { ar: 'متجر إلكتروني', en: 'E-commerce store' }, min: 24000, max: 48000 },
    mobile: { label: { ar: 'تطبيق جوال', en: 'Mobile application' }, min: 45000, max: 90000 },
    software: { label: { ar: 'نظام أو منصة مخصصة', en: 'Custom system or platform' }, min: 40000, max: 85000 },
  } satisfies Record<string, Option>,
  complexity: {
    standard: { label: { ar: 'واجهة عملية مخصصة', en: 'Practical custom interface' }, min: 0, max: 0 },
    advanced: { label: { ar: 'تجربة متقدمة وحركات محسوبة', en: 'Advanced experience and motion' }, min: 6000, max: 14000 },
    premium: { label: { ar: 'تصميم وهوية رقمية مميزة', en: 'Premium digital design system' }, min: 14000, max: 28000 },
  } satisfies Record<string, Option>,
  timeline: {
    flexible: { label: { ar: 'مرن', en: 'Flexible' }, factor: 1 },
    standard: { label: { ar: 'المدة المعتادة', en: 'Standard delivery' }, factor: 1.08 },
    priority: { label: { ar: 'أولوية عاجلة', en: 'Priority delivery' }, factor: 1.22 },
  },
  unit: { included: 5, min: 700, max: 1500 },
  additions: {
    bilingual: { min: 3500, max: 8000 }, ecommerce: { min: 9000, max: 22000 },
    authentication: { min: 5000, max: 12000 }, adminDashboard: { min: 8000, max: 22000 },
    payments: { min: 5000, max: 12000 }, integration: { min: 3000, max: 9000 },
  },
} as const;

export function calculateEstimate(input: EstimatorSelections) {
  const type = estimatorConfig.projectTypes[input.projectType];
  const complexity = estimatorConfig.complexity[input.complexity];
  let min = type.min + complexity.min;
  let max = type.max + complexity.max;
  const extraUnits = Math.max(0, Math.min(100, input.units) - estimatorConfig.unit.included);
  min += extraUnits * estimatorConfig.unit.min;
  max += extraUnits * estimatorConfig.unit.max;
  for (const key of ['bilingual', 'ecommerce', 'authentication', 'adminDashboard', 'payments'] as const) {
    if (input[key]) { min += estimatorConfig.additions[key].min; max += estimatorConfig.additions[key].max; }
  }
  const integrations = Math.max(0, Math.min(10, input.integrations));
  min += integrations * estimatorConfig.additions.integration.min;
  max += integrations * estimatorConfig.additions.integration.max;
  const factor = estimatorConfig.timeline[input.timeline].factor;
  return { min: Math.round(min * factor / 500) * 500, max: Math.round(max * factor / 500) * 500 };
}
