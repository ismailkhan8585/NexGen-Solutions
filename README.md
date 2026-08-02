# NexGen Solutions website

Arabic-first, bilingual company website built with Next.js 13 App Router, React 18, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

## Local development

1. Copy `.env.example` to `.env` and enter local values.
2. Install dependencies with `npm install`.
3. Generate Prisma Client with `npm run db:generate`.
4. Start the site with `npm run dev`.

Do not commit `.env`. The existing `.gitignore` excludes it.

## Business information to complete

All public business facts are centralized in `lib/business-config.ts`. Enter verified values through the matching variables in `.env` locally and in the Vercel dashboard for Preview and Production.

- Saudi business phone and WhatsApp number, including country code `966`
- Public business email
- Verified address, if one should be published
- Arabic and English working hours
- Booking and Google Maps URLs
- Verified LinkedIn, Instagram, X, and GitHub URLs
- Commercial Registration number and VAT number, if they should be public

Missing values are `null` and are hidden from the public interface. Riyadh, Jeddah, Dammam, Khobar, Makkah, and Madinah describe service availability only; the site does not claim offices in those cities.

The fixed regional configuration is:

- Default locale: Arabic (`ar`)
- Secondary locale: English (`en`)
- Direction: RTL for Arabic, LTR for English
- Currency: SAR
- Timezone: `Asia/Riyadh`

## Authentication and database safety

`DATABASE_URL`, `NEXTAUTH_SECRET`, and administrator credentials are server-only. Use a unique production `NEXTAUTH_SECRET` and set `NEXTAUTH_URL` to the deployed canonical origin.

`npm run seed` creates only an administrator from `ADMIN_SEED_*`. It contains no default password and creates no projects, testimonials, team members, statistics, or other public content. Seeding is optional and must never be used as a migration command.

No destructive Prisma command is part of build or installation. Vercel runs `prisma generate` during `postinstall`; it does not migrate or reset data.

## Content publishing rules

- Publish only verified team members and approved testimonials.
- Project URLs using `example.com` are marked as **Demo Project** and client/result claims are hidden.
- Arabic articles require Arabic title and content before they appear on Arabic routes.
- Payment and local-platform names describe integration capability only, not existing integrations.

## Verification

```text
npm run lint
npm run typecheck
npm run build
```

There is currently no automated test suite or `test` script. Add route, form, and accessibility tests before expanding into Step 2 features.

## Deployment

Configure at minimum `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and `NEXT_PUBLIC_APP_URL` in Vercel. Add the public business variables above as facts are verified. Redeploy after changing `NEXT_PUBLIC_*` variables because they are embedded during the build.

### Step 2 database migration

Step 2 includes one additive migration for audit timestamps, enquiry consent/language/estimator data, and managed FAQs. Back up the production database, review `prisma/migrations/20260802120000_step2_safe_content_fields/migration.sql`, then run:

```bash
npm run db:migrate:deploy
```

Do not use `prisma db push` in production. The migration does not delete or rename existing columns or records.

`INQUIRY_WEBHOOK_URL` is optional. When configured it must be HTTPS and receives only the stored lead reference, selected service, and preferred language. Connect that endpoint to a reviewed email/CRM workflow; full personal details remain in the protected admin system.
