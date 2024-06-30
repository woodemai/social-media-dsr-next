'use server';

import { db } from '@/config/prisma';
import { getCurrentUser } from '@/entities/user';

import { commentSchema, type commentSchemaType } from './schemas';
import { type FullComment } from './types';

export const createCommentAction = async (
  values: commentSchemaType,
  postId: string,
): Promise<FullComment> => {
  const validatedFields = commentSchema.safeParse(values);

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

export const commentUpdateAction = async (
  values: Partial<commentSchemaType>,
  commentId: string,
): Promise<FullComment> => {
  const validatedFields = commentSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }

  const user = await getCurrentUser();

  if (!user.id) {
    throw new Error('User not found');
  }

  return db.comment.update({
    where: {
      id: commentId,
    },
    data: {
      ...validatedFields.data,
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
