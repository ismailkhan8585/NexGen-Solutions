import { Prisma, PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getRuntimeDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) return undefined;

  try {
    const url = new URL(value);
    // Prisma 5 defaults to a 5-second connection timeout, which can expire
    // while a scale-to-zero Neon compute is waking. Preserve explicit user
    // values and add conservative serverless defaults only when absent.
    if (!url.searchParams.has('connect_timeout')) {
      url.searchParams.set('connect_timeout', '15');
    }
    if (!url.searchParams.has('pool_timeout')) {
      url.searchParams.set('pool_timeout', '15');
    }
    if (!url.searchParams.has('connection_limit')) {
      url.searchParams.set('connection_limit', '5');
    }
    return url.toString();
  } catch {
    // Prisma will provide the actionable validation error for a malformed URL.
    return value;
  }
}

const runtimeDatabaseUrl = getRuntimeDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(runtimeDatabaseUrl
      ? { datasources: { db: { url: runtimeDatabaseUrl } } }
      : {}),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

let connectionPromise: Promise<void> | null = null;

function isTransientConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  const code = (error as { code?: string; errorCode?: string })?.code ??
    (error as { errorCode?: string })?.errorCode;
  return code ? ['P1001', 'P1002', 'P1008', 'P1017'].includes(code) : false;
}

/**
 * Warms a cold database connection before read queries run. Only the connection
 * is retried; mutations are never replayed, so create/update behavior is safe.
 */
export async function ensurePrismaConnection() {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      // `$connect()` can resolve after starting the query engine without proving
      // that a remote/serverless database has completed its cold handshake.
      // A trivial read is the readiness check the page actually needs.
      connectionPromise ??= prisma.$queryRaw`SELECT 1`.then(() => undefined);
      await connectionPromise;
      return;
    } catch (error) {
      connectionPromise = null;
      if (!isTransientConnectionError(error) || attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
    }
  }
}
