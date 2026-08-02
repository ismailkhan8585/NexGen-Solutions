import { businessConfig } from './business-config';

export const LOCALES = ['ar', 'en'] as const;
export const DEFAULT_LOCALE = businessConfig.defaultLocale;

export const SERVICES = [
  'web',
  'app',
  'design',
  'ecommerce',
  'software',
  'ai',
  'marketing',
  'cloud',
  'security',
  'consulting',
  'saas',
  'blockchain',
] as const;

export const BUDGET_RANGES = [
  'UNDER_5000',
  '5000_15000',
  '15000_50000',
  '50000_PLUS',
  'DISCUSS',
] as const;

export const TIMELINES = [
  'ASAP',
  'ONE_MONTH',
  'ONE_TO_THREE_MONTHS',
  'THREE_TO_SIX_MONTHS',
  'FLEXIBLE',
] as const;
