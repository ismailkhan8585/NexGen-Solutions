function required(name: 'DATABASE_URL' | 'NEXTAUTH_SECRET') {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}
export function validateServerEnvironment() {
  const databaseUrl = required('DATABASE_URL');
  const nextAuthSecret = required('NEXTAUTH_SECRET');
  try { const url = new URL(databaseUrl); if (!['postgres:','postgresql:'].includes(url.protocol)) throw new Error(); } catch { throw new Error('DATABASE_URL must be a valid PostgreSQL URL'); }
  if (process.env.NODE_ENV === 'production' && nextAuthSecret.length < 32) throw new Error('NEXTAUTH_SECRET must contain at least 32 characters in production');
  const webhook = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (webhook) { try { if (new URL(webhook).protocol !== 'https:') throw new Error(); } catch { throw new Error('INQUIRY_WEBHOOK_URL must be a valid HTTPS URL'); } }
  return { databaseUrl, nextAuthSecret, inquiryWebhookUrl: webhook || null } as const;
}
