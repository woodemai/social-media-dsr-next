'use server';

import { type z } from 'zod';

import { db } from '@/config/prisma';
import { getCurrentUser } from '@/shared/api/user';
import { createSchema } from '@/shared/schemas/post';
import { type FullPost } from '../api/post';

export const createPostAction = async (
  values: z.infer<typeof createSchema>,
) => {
  const validatedFields = createSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: 'Ошибка валидации',
    };

  const user = await getCurrentUser();

  if (!user)
    return {
      error: 'Пользователь не авторизован',
    };

  const createdPost: FullPost = await db.post.create({
    data: {
      multimedia: validatedFields.data.multimedia,
      body: validatedFields.data.body,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      _count: {
        select: {
          likedUsers: true,
        },
      },
      likedUsers: {
        where: {
          id: user.id,
        },
        select: {
          id: true,
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    post: createdPost,
    success: 'Пост успешно создан',
  };
};

export const likePostAction = async (id: string) => {
  const user = await getCurrentUser();
  return db.post.update({
    where: {
      id,
    },
    data: {
      likedUsers: {
        connect: {
          id: user?.id,
        },
      },
    },
    include: {
      likedUsers: {
        where: {
          id: user?.id,
        },
      },
      _count: {
        select: {
          likedUsers: true,
        },
      },
    },
  });
};

export const unlikePostAction = async (id: string) => {
  const user = await getCurrentUser();

  return db.post.update({
    where: {
      id,
    },
    data: {
      likedUsers: {
        disconnect: {
          id: user?.id,
        },
      },
    },
    include: {
      likedUsers: {
        where: {
          id: user?.id,
        },
      },
      _count: {
        select: {
          likedUsers: true,
        },
      },
    },
  });
};

export const deleteAction = async (id: string) => {
  return db.post.delete({
    where: { id },
  });
};
