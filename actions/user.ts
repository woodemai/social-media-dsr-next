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
