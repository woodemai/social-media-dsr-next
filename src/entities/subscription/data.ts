'use server';
import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { db } from '@/config/prisma';
import { getCurrentUser } from '@/entities/user';

import { type SubscriptionInfo, type FullSubscriptionRequest } from './types';

export const getSubscriptionRequests = async (): Promise<
  FullSubscriptionRequest[]
> => {
  const { id } = await getCurrentUser();

  return db.subscriptionRequest.findMany({
    where: {
      requestToId: id,
    },
    include: {
      requestBy: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getIsSubscribed = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return false;

  if (currentUser.id === id) return false;

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

export const getSubscriptionInfo = async (
  id: string,
  page = 1,
): Promise<SubscriptionInfo> => {
  const subscriptionInfo = await db.user.findUnique({
    where: { id },
    select: {
      subscribed: {
        select: {
          name: true,
          id: true,
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      },
      subscribers: {
        select: {
          name: true,
          id: true,
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      },
    },
  });

  if (!subscriptionInfo) {
    throw new Error('Пользователь не найден');
  }
  return subscriptionInfo;
};
