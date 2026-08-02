import { AdminRole, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME?.trim() || 'Administrator';

  if (!email || !password) {
    throw new Error(
      'ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD are required. No default administrator credentials are provided.'
    );
  }
  if (password.length < 12) {
    throw new Error('ADMIN_SEED_PASSWORD must contain at least 12 characters.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { name, email, password: passwordHash, role: AdminRole.SUPER_ADMIN },
  });

  console.log('Administrator seed completed. No public content was created or changed.');
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : 'Seed failed.');
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
