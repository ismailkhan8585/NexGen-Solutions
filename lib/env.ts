export const env = {
  databaseUrl: process.env.DATABASE_URL ?? '',
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? 'nexgen-dev-secret-change-me',
  nextAuthUrl: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  publicCloudinaryCloudName:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '923000000000',
  companyEmail:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'hello@nexgensolutions.agency',
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://nexgensolutions.agency',
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'NexGen Solutions',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  adminSeedEmail: process.env.ADMIN_SEED_EMAIL ?? 'admin@nexgensolutions.agency',
  adminSeedPassword: process.env.ADMIN_SEED_PASSWORD ?? 'Admin@123456',
} as const;
