import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function requireAdmin(superAdmin = false) {
  const session = await getServerSession(authOptions);
  const role = session?.user && (session.user as { role?: string }).role;
  if (!session || !role || (superAdmin && role !== 'SUPER_ADMIN')) {
    return { session: null, response: NextResponse.json({ error: superAdmin ? 'forbidden' : 'unauthorized' }, { status: superAdmin ? 403 : 401 }) };
  }
  return { session, response: null };
}

export function cleanAdminText(value: unknown, max = 5000) {
  return String(value ?? '').replace(/[<>\u0000-\u001F]/g, '').trim().slice(0, max);
}
