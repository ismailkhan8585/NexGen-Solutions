import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { validateInquiry } from '@/lib/inquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const limits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

function isAllowed(key: string) {
  const now = Date.now();
  const current = limits.get(key);
  if (!current || current.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

async function notifyIntegration(payload: { refNumber: string; locale: string; service: string }) {
  const url = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    const target = new URL(url);
    if (target.protocol !== 'https:') return;
    await fetch(target, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(5000), cache: 'no-store',
    });
  } catch {
    // The lead is already stored. Notification failures must not expose data or fake a storage failure.
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  if (!isAllowed(clientKey(request))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '600' } });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  const result = validateInquiry(body);
  if (!result.ok) return NextResponse.json({ error: result.code, fields: result.fields }, { status: 400 });
  const data = result.data;

  // Bots commonly fill the hidden field or submit before a person can read the form.
  if (data.website || !Number.isFinite(data.formStartedAt) || Date.now() - data.formStartedAt < 2500) {
    return NextResponse.json({ error: 'submission_rejected' }, { status: 400 });
  }

  try {
    const refNumber = `INQ-${new Date().getFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`;
    const inquiry = await prisma.projectInquiry.create({
      data: {
        refNumber, clientName: data.clientName, email: data.email, phone: data.phone,
        company: data.company || null, service: data.service, budget: data.budget,
        timeline: data.timeline, description: data.description,
        preferredLanguage: data.preferredLanguage, consentAt: new Date(),
        estimatorData: data.estimatorData as Prisma.InputJsonValue | undefined,
        source: `website-${data.preferredLanguage}`,
      },
      select: { refNumber: true, preferredLanguage: true, service: true },
    });
    await notifyIntegration({ refNumber: inquiry.refNumber, locale: inquiry.preferredLanguage || 'ar', service: inquiry.service });
    return NextResponse.json({ success: true, refNumber: inquiry.refNumber }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'storage_unavailable' }, { status: 503 });
  }
}
