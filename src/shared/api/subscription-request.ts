import { type SubscriptionRequest } from '@prisma/client';

import { db } from '@/config/prisma';

import { getCurrentUser } from './user';

export type FullSubscriptionRequest = {
  requestBy: {
    name: string | null;
  };
} & SubscriptionRequest;

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
