import { type SubscriptionRequest } from '@prisma/client';
import { type FullUser, getCurrentUser, getUserById } from '@/entities/user';
import { type FullSubscriptionRequest } from './types';
import { db } from '@/config/prisma';

type SubscriptionActionReturnType = {
  request?: SubscriptionRequest;
  user?: FullUser;
  error?: string;
};

export const subscribeAcceptAction = async (
  subscriptionRequest: FullSubscriptionRequest,
) => {
  await db.user.update({
    where: {
      id: subscriptionRequest.requestToId,
    },
    data: {
      subscribers: {
        connect: {
          id: subscriptionRequest.requestById,
        },
      },
    },
  });
  await db.subscriptionRequest.delete({
    where: {
      id: subscriptionRequest.id,
    },
  });
};

export const subscribeRejectAction = async (
  subscriptionRequest: FullSubscriptionRequest,
) => {
  return db.subscriptionRequest.delete({
    where: {
      id: subscriptionRequest.id,
    },
  });
};

export const subscribeAction = async (
  id: string,
  isSubscribed: boolean,
): Promise<SubscriptionActionReturnType> => {
  const user = await getUserById(id);
  const currentUser = await getCurrentUser();

  if (user?.isPrivate && !isSubscribed) {
    if (currentUser?.id) {
      const isRequestExists = await db.subscriptionRequest.findFirst({
        where: {
          requestById: currentUser.id,
          requestToId: user.id,
        },
      });
      if (isRequestExists) {
        return {
          error: 'Запрос на подписку уже отправлен',
        };
      }
      const newSubscriptionRequest = await db.subscriptionRequest.create({
        data: {
          requestById: currentUser.id,
          requestToId: user.id,
        },
      });
      return {
        request: newSubscriptionRequest,
      };
    } else {
      return {
        error: 'Пользователь не авторизован',
      };
    }
  } else {
    const subscribers = isSubscribed
      ? { disconnect: { id: currentUser?.id } }
      : { connect: { id: currentUser?.id } };
    return {
      user: await db.user.update({
        where: {
          id,
        },
        data: {
          subscribers,
        },
        include: {
          _count: {
            select: {
              subscribers: true,
              subscribed: true,
            },
          },
          subscribers: {
            where: {
              id: currentUser?.id,
            },
          },
        },
      }),
    };
  }
};
