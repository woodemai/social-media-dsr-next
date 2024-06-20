import { db } from '@/config/prisma';

import { getCurrentUser } from '../user/data';
import { type FullSubscriptionRequest } from './types';

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