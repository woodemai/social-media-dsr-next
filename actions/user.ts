'use server';

import { z } from 'zod';

import { currentUser } from '@/data/user';
import { db } from '@/lib/prisma';
import { updateSchema } from '@/schemas/user';

export const getUsers = async (name: string) => {
  const user = await currentUser();

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

export const subscribeToUser = async (id: string) => {
  const user = await currentUser();
  return db.user.update({
    where: { id },
    data: {
      subscribers: {
        connect: { id: user?.id },
      },
    },
    include: {
      _count: {
        select: {
          subscribers: {
            where: {
              id: user?.id,
            },
          },
        },
      },
    },
  });
};
export const unsubscribeFromUser = async (id: string) => {
  const user = await currentUser();
  return db.user.update({
    where: { id },
    data: {
      subscribers: {
        disconnect: { id: user?.id },
      },
    },
    include: {
      _count: {
        select: {
          subscribers: {
            where: {
              id: user?.id,
            },
          },
        },
      },
    },
  });
};

export const updateProfileAction = async (
  id: string,
  values: z.infer<typeof updateSchema>,
) => {
  const validatedFields = updateSchema.safeParse(values);

  if (!validatedFields.success) return;

  const { name, bio } = validatedFields.data;

  const response = await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      bio,
    },
  });
  return response;
};
