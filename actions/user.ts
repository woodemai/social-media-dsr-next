'use server';

import { currentUser } from '@/data/user';
import { db } from '@/lib/prisma';

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
        connect: { id: user?.id }
      }
    },
    include: {
      _count: {
        select: {
          subscribers: {
            where: {
              id: user?.id
            }
          }
        }
      }
    }
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