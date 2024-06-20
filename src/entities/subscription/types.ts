import { type User, type SubscriptionRequest } from '@prisma/client';

export type FullSubscriptionRequest = {
  requestBy: {
    name: string | null;
  };
} & SubscriptionRequest;

export enum SubscriptionTabs {
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBED = 'subscribed',
}

export type UserNameAndId = Pick<User, 'name' | 'id'>;

export type SubscriptionInfo = {
  subscribers: UserNameAndId[];
  subscribed: UserNameAndId[];
};
