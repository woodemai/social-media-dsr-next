import { auth } from '../../auth';

import { User } from '@prisma/client';

import { db } from '@/config/prisma';

export type FullUser = {
  _count: {
    subscribed: number;
    subscribers: number;
  };
  subscribers?: User[];
} & User;

export const getUserById = async (id: string): Promise<FullUser | null> => {
  return await db.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subscribed: true,
          subscribers: true,
        },
      },
    },
  });
};

export const getIsSubscribed = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return false;

  if (currentUser?.id === id) return false;

  const subscribersWithCurrentUserId = await db.user.count({
    where: {
      id,
      subscribers: {
        some: {
          id: currentUser.id,
        },
      },
    },
  });
  return subscribersWithCurrentUserId > 0;
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return;
  }
};

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getFullCurrentUser = async (): Promise<
  User | null | undefined
> => {
  const user = await getCurrentUser();
  if (!user?.id) return;
  return db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
};
