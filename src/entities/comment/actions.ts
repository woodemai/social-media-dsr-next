'use server';

import { type z } from 'zod';

import { db } from '@/config/prisma';
import { getCurrentUser } from '@/entities/user';

import { commentCreateSchema } from './schemas';
import { type FullComment } from './types';

export const createCommentAction = async (
  values: z.infer<typeof commentCreateSchema>,
  postId: string,
): Promise<FullComment> => {
  const validatedFields = commentCreateSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }

  const user = await getCurrentUser();

  if (!user.id) {
    throw new Error('User not found');
  }

  return db.comment.create({
    data: {
      body: values.body,
      authorId: user.id,
      postId,
    },
    select: {
      id: true,
      body: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

export const removeCommentAction = async (commentId: string) => {
  return db.comment.delete({
    where: {
      id: commentId,
    },
  });
};
