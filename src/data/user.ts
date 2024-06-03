import { auth } from '../auth';

import { User } from '@prisma/client';

import { db } from '@/config/prisma';

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return;
  }
};

export const getUserByIdWithSubscription = async (id: string) => {
  const user = await currentUser();

  const isSubscribed =
    (await db.user.count({
      where: {
        id,
        subscribers: {
          some: {
            id: user?.id,
          },
        },
      },
    })) > 0;

  const response = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          subscribers: true,
          subscribed: true,
        },
      },
    },
  });
  return {
    isSubscribed,
    user: response,
  };
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
