'use server';

import { SubscriptionRequest, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { db } from '@/config/prisma';
import { FullSubscriptionRequest } from '@/data/subscription-request';
import { getCurrentUser, getUserById } from '@/data/user';
import { updateSchema } from '@/schemas/user';

export const getUsers = async (name: string) => {
  const user = await getCurrentUser();

  return db.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
      NOT: { id: user?.id },
    },
  });
};

type SubscriptionActionReturnType = {
  request?: SubscriptionRequest;
  user?: { _count: { subscribers: number }; subscribers: User[] } & User;
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
            },
          },
          subscribers: {
            where: {
              id: user?.id,
            },
          },
        },
      }),
    };
  }
};

type UpdateUserInfoResponse = {
  name?: string | null;
  bio?: string | null;
  isPrivate?: boolean | null;
  error?: string;
};

export const updateProfileAction = async (
  id: string,
  values: z.infer<typeof updateSchema>,
): Promise<UpdateUserInfoResponse> => {
  const user = await db.user.findUnique({ where: { id } });
  const validatedFields = updateSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: 'Поля заполнены неверно',
    };

  const { name, bio, password, isPrivate } = validatedFields.data;

  let hashedNewPassword = undefined;

  if (password && user?.password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      hashedNewPassword = await bcrypt.hash(password, 12);
    } else {
      return { error: 'Пароль совпадает с текущим' };
    }
  }

  return db.user.update({
    where: {
      id,
    },
    data: {
      name,
      bio,
      password: hashedNewPassword,
      isPrivate,
    },
    select: {
      name: true,
      bio: true,
      isPrivate: true,
    },
  });
};
