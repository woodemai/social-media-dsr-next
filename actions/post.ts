'use server';

import { z } from 'zod';

import { currentUser } from '@/data/user';
import { db } from '@/lib/prisma';
import { createSchema } from '@/schemas/form';

export const createPostAction = async (values: z.infer<typeof createSchema>) => {
  const validatedFields = createSchema.safeParse(values);

  if (!validatedFields.success) return {
    error: 'Ошибка валидации'
  };

  const user = await currentUser();

  if (!user) return {
    error: 'Пользователь не авторизован'
  };

  await db.post.create({
    data: {
      body: validatedFields.data.body,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });

  return {
    success: 'Пост успешно создан'
  };
};