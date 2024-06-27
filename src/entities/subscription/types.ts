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

export type UserNameAndId = Pick<User, 'name' | 'id' | 'bio' | 'image'>;

export type SubscriptionInfo = {
  id: string;
  name: string | null;
  subscribers: UserNameAndId[];
  subscribed: UserNameAndId[];
};
