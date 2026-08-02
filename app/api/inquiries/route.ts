import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = RATE_LIMIT_MAP.get(ip);

  if (!limit || now > limit.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

function generateRefNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `INQ-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      clientName,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      description,
    } = body;

    if (!clientName || !email || !service || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.projectInquiry.create({
      data: {
        refNumber: generateRefNumber(),
        clientName: String(clientName).slice(0, 255),
        email: String(email).slice(0, 255),
        phone: phone ? String(phone).slice(0, 50) : null,
        company: company ? String(company).slice(0, 255) : null,
        service: String(service).slice(0, 100),
        budget: budget ? String(budget).slice(0, 100) : null,
        timeline: timeline ? String(timeline).slice(0, 100) : null,
        description: String(description).slice(0, 5000),
        source: 'website',
      },
    });

    return NextResponse.json(
      { success: true, refNumber: inquiry.refNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
