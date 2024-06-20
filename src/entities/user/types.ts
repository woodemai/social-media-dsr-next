import { type User } from '@prisma/client';

export type FullUser = {
  _count: {
    subscribed: number;
    subscribers: number;
  };
  subscribers?: User[];
} & User;
