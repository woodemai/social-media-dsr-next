import { db } from '@/config/prisma';
import { getCurrentUser } from './user';
import { SubscriptionRequest } from '@prisma/client';

export type FullSubscriptionRequest = {
  requestBy: {
    name: string | null;
  };
} & SubscriptionRequest;

export const getSubscriptionRequests = async (): Promise<
  FullSubscriptionRequest[]
> => {
  const currentUser = await getCurrentUser();

  return db.subscriptionRequest.findMany({
    where: {
      requestToId: currentUser?.id,
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
