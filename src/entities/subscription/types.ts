import { type SubscriptionRequest } from '@prisma/client';

export type FullSubscriptionRequest = {
  requestBy: {
    name: string | null;
  };
} & SubscriptionRequest;
