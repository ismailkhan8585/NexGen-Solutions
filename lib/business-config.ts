export type PublicLocale = 'ar' | 'en';

type LocalizedText = Readonly<Record<PublicLocale, string>>;

function publicValue(value: string | undefined): string | null {
  value = value?.trim();
  return value ? value : null;
}

/**
 * Public, non-secret business facts used throughout the website.
 *
 * TODO(BUSINESS): Add missing values through the documented NEXT_PUBLIC_*
 * variables. Nullable values are intentionally hidden by the UI until they
 * are verified; never replace them with invented contact or registration data.
 */
export const businessConfig = {
  companyName: {
    ar: process.env.NEXT_PUBLIC_APP_NAME_AR?.trim() || 'نيكس جين سولوشنز',
    en: process.env.NEXT_PUBLIC_APP_NAME?.trim() || 'NexGen Solutions',
  } satisfies LocalizedText,
  businessEmail: publicValue(process.env.NEXT_PUBLIC_COMPANY_EMAIL),
  phone: publicValue(process.env.NEXT_PUBLIC_SAUDI_PHONE),
  whatsapp: publicValue(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  address: {
    ar: publicValue(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_AR),
    en: publicValue(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_EN),
  },
  workingHours: {
    ar: publicValue(process.env.NEXT_PUBLIC_WORKING_HOURS_AR),
    en: publicValue(process.env.NEXT_PUBLIC_WORKING_HOURS_EN),
  },
  social: {
    linkedin: publicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: publicValue(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    x: publicValue(process.env.NEXT_PUBLIC_X_URL),
    github: publicValue(process.env.NEXT_PUBLIC_GITHUB_URL),
  },
  bookingUrl: publicValue(process.env.NEXT_PUBLIC_BOOKING_URL),
  googleMapsUrl: publicValue(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL),
  crNumber: publicValue(process.env.NEXT_PUBLIC_CR_NUMBER),
  vatNumber: publicValue(process.env.NEXT_PUBLIC_VAT_NUMBER),
  appUrl:
    publicValue(process.env.NEXT_PUBLIC_APP_URL) || 'https://nexgensolutions.agency',
  defaultCurrency: 'SAR',
  timezone: 'Asia/Riyadh',
  defaultLocale: 'ar' as const,
  secondaryLocale: 'en' as const,
  supportedCities: {
    ar: ['الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة', 'المدينة المنورة'],
    en: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Makkah', 'Madinah'],
  } satisfies Readonly<Record<PublicLocale, readonly string[]>>,
} as const;

export function normalizeSaudiPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('966')) return digits;
  if (digits.startsWith('0')) return `966${digits.slice(1)}`;
  return digits;
}

export function formatSaudiPhone(value: string, locale: PublicLocale): string {
  const digits = normalizeSaudiPhone(value);
  if (digits.length !== 12 || !digits.startsWith('966')) return value;
  const formatted = `+966 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  return locale === 'ar' ? formatted.replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]) : formatted;
}

export type WhatsAppContext = { service?: string | null; project?: string | null; pageUrl?: string | null };

export function getWhatsAppUrl(locale: PublicLocale, context?: string | WhatsAppContext): string | null {
  if (!businessConfig.whatsapp) return null;
  const defaultMessage = locale === 'ar'
    ? 'مرحباً، أرغب في مناقشة مشروع رقمي.'
    : 'Hello, I would like to discuss a digital project.';
  let message = typeof context === 'string' ? context : defaultMessage;
  if (context && typeof context === 'object') {
    const lines = [defaultMessage];
    if (context.service) lines.push(locale === 'ar' ? `الخدمة: ${context.service}` : `Service: ${context.service}`);
    if (context.project) lines.push(locale === 'ar' ? `معلومات المشروع: ${context.project}` : `Project information: ${context.project}`);
    if (context.pageUrl) lines.push(locale === 'ar' ? `الصفحة: ${context.pageUrl}` : `Page: ${context.pageUrl}`);
    message = lines.join('\n');
  }
  return `https://wa.me/${normalizeSaudiPhone(businessConfig.whatsapp)}?text=${encodeURIComponent(message)}`;
}

export function formatSar(value: number, locale: PublicLocale): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: businessConfig.defaultCurrency,
    maximumFractionDigits: 0,
  }).format(value);
}
