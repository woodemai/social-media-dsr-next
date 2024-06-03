'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { db } from '@/config/prisma';
import { currentUser } from '@/data/user';
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

export const handleSubscribeAction = async (
  id: string,
  isSubscribed: boolean,
) => {
  const user = await currentUser();
  const subscribers = isSubscribed
    ? { disconnect: { id: user?.id } }
    : { connect: { id: user?.id } };
  return db.user.update({
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
  });
};

type UpdateUserInfoResponse = {
  name?: string | null;
  bio?: string | null;
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

  const { name, bio, password } = validatedFields.data;

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
    },
    select: {
      name: true,
      bio: true,
    },
  });
};
