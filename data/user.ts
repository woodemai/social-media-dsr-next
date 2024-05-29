import { User } from '@prisma/client';

import { auth } from '@/auth';
import { db } from '@/lib/prisma';

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return;
  }
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getFullCurrentUser = async (): Promise<
  User | null | undefined
> => {
  const user = await currentUser();
  if (!user?.id) return;
  return db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
};