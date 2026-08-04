import { BUDGET_RANGES, SERVICES, TIMELINES } from '@/lib/constants';

export type InquiryLocale = 'ar' | 'en';

export type InquiryInput = {
  clientName: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  preferredLanguage: InquiryLocale;
  consent: boolean;
  website: string;
  formStartedAt: number;
  estimatorData?: Record<string, unknown> | null;
};

const emailPattern = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const phonePattern = /^[+\d][\d\s()-]{6,24}$/;
const languageRequirements = ['arabic', 'english', 'bilingual'] as const;
const contactMethods = ['email', 'phone', 'whatsapp'] as const;

function isIsoCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function clean(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[<>\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function validateInquiry(value: unknown):
  | { ok: true; data: InquiryInput }
  | { ok: false; code: string; fields?: Record<string, string> } {
  if (!value || typeof value !== 'object') return { ok: false, code: 'invalid_request' };
  const body = value as Record<string, unknown>;
  const estimatorBody = body.estimatorData && typeof body.estimatorData === 'object' && !Array.isArray(body.estimatorData)
    ? body.estimatorData as Record<string, unknown>
    : null;
  const languageRequirement = clean(estimatorBody?.languageRequirement, 20);
  const preferredContactMethod = clean(estimatorBody?.preferredContactMethod, 20);
  const desiredLaunchDate = clean(estimatorBody?.desiredLaunchDate, 10);
  const data: InquiryInput = {
    clientName: clean(body.clientName, 120),
    company: clean(body.company, 160),
    phone: clean(body.phone, 30),
    email: clean(body.email, 254).toLowerCase(),
    service: clean(body.service, 80),
    budget: clean(body.budget, 40),
    timeline: clean(body.timeline, 40),
    description: clean(body.description, 4000),
    preferredLanguage: body.preferredLanguage === 'en' ? 'en' : 'ar',
    consent: body.consent === true,
    website: clean(body.website, 100),
    formStartedAt: Number(body.formStartedAt),
    estimatorData: estimatorBody
      ? {
          summary: clean(estimatorBody.summary, 2000),
          range: clean(estimatorBody.range, 200),
          ...(languageRequirement ? { languageRequirement } : {}),
          ...(preferredContactMethod ? { preferredContactMethod } : {}),
          ...(desiredLaunchDate ? { desiredLaunchDate } : {}),
        }
      : null,
  };
  const fields: Record<string, string> = {};
  if (data.clientName.length < 2) fields.clientName = 'required';
  if (!emailPattern.test(data.email)) fields.email = 'invalid';
  if (!phonePattern.test(data.phone)) fields.phone = 'invalid';
  if (!(SERVICES as readonly string[]).includes(data.service)) fields.service = 'invalid';
  if (!(BUDGET_RANGES as readonly string[]).includes(data.budget)) fields.budget = 'invalid';
  if (!(TIMELINES as readonly string[]).includes(data.timeline)) fields.timeline = 'invalid';
  const estimator = data.estimatorData;
  if (estimator?.languageRequirement && !(languageRequirements as readonly string[]).includes(String(estimator.languageRequirement))) fields.languageRequirement = 'invalid';
  if (estimator?.preferredContactMethod && !(contactMethods as readonly string[]).includes(String(estimator.preferredContactMethod))) fields.preferredContactMethod = 'invalid';
  if (estimator?.desiredLaunchDate && !isIsoCalendarDate(String(estimator.desiredLaunchDate))) fields.desiredLaunchDate = 'invalid';
  if (data.description.length < 20) fields.description = 'too_short';
  if (!data.consent) fields.consent = 'required';
  if (!Number.isFinite(data.formStartedAt) || data.formStartedAt > Date.now() + 60_000) fields.formStartedAt = 'invalid';
  if (Object.keys(fields).length) return { ok: false, code: 'validation_failed', fields };
  return { ok: true, data };
}
