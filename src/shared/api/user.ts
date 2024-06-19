import { type User } from '@prisma/client';
import { type User as AuthUser } from 'next-auth';

import { auth } from '@/auth';
import { db } from '@/config/prisma';

export const getCurrentUser = async (): Promise<AuthUser> => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  return session.user;
};

export const getFullCurrentUser = async (): Promise<User> => {
  const { id } = await getCurrentUser();
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};


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

