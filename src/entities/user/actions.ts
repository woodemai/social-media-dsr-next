'use server';

import { hash, compare } from 'bcryptjs';
import { type z } from 'zod';

import { db } from '@/config/prisma';
import { getCurrentUser } from '@/entities/user/data';

import { updateSchema } from './schemas';

export const getUsersByNameAction = async (name: string) => {
  const user = await getCurrentUser();

  return db.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
      NOT: { id: user.id },
    },
  });
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
    const isMatch = await compare(password, user.password);

    if (isMatch) return { error: 'Пароль совпадает с текущим' };

    hashedNewPassword = await hash(password, 8);
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
