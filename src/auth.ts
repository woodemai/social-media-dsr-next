import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Role } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

import authConfig from '@/auth.config';
import { db } from '@/config/prisma';
import { getUserById } from '@/entities/user/data';

export type AuthUser = {
  role: Role;
} & DefaultSession['user'];

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
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
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
