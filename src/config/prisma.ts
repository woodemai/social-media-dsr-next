import { PrismaClient } from '@prisma/client';

import { env } from '@/env.mjs';



const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma || new PrismaClient();
if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;