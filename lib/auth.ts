import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { validateServerEnvironment } from './server-env';

const serverEnv = validateServerEnvironment();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!admin || !admin.isActive) return null;

        if (admin.lockedUntil && admin.lockedUntil > new Date()) return null;

        const isValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isValid) {
          const attempts = admin.loginAttempts + 1;
          const shouldLock = attempts >= 5;
          await prisma.admin.update({
            where: { id: admin.id },
            data: {
              loginAttempts: attempts,
              lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null,
            },
          });
          return null;
        }

        await prisma.admin.update({
          where: { id: admin.id },
          data: { loginAttempts: 0, lockedUntil: null },
        });

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        } as { id: string; name: string; email: string; role: string };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as { role: string }).role;
        token.id = (user as unknown as { id: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: serverEnv.nextAuthSecret,
};
