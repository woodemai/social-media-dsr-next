import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

import authConfig from '@/auth.config';
import { getUserById } from '@/src/data/user';
import { db } from '@/src/lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth' {
  interface JWT {
    role: Role;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      return {
        ...token,
        role: existingUser.role,
      };
    },
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
