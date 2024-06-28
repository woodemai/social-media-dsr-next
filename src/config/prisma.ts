import { PrismaClient } from '@prisma/client';

import { env } from '@/env.mjs';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma || new PrismaClient();

const IS_NODE_DEVELOPMENT = env.NODE_ENV === 'development';
const IS_VERCEL_DEVELOPMENT = env.NEXT_PUBLIC_VERCEL_ENV === 'development';

if (IS_NODE_DEVELOPMENT || IS_VERCEL_DEVELOPMENT) {
  globalForPrisma.prisma = db;
}