'use server';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { db } from '@/config/prisma';
import { postSchema, type postSchemaType } from '@/entities/post/schemas';
import { getCurrentUser } from '@/entities/user/data';

import { type FullPost } from './types';

export const createPostAction = async (values: postSchemaType) => {
  const validatedFields = postSchema.safeParse(values);

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
      ...validatedFields.data,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          author: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
        take: PAGE_SIZE,
      },
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
          id: user.id,
        },
      },
    },
    include: {
      likedUsers: {
        where: {
          id: user.id,
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
          id: user.id,
        },
      },
    },
    include: {
      likedUsers: {
        where: {
          id: user.id,
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

export const postUpdateAction = async (
  id: string,
  values: postSchemaType,
): Promise<FullPost | null> => {
  const validatedFields = postSchema.safeParse(values);

  if (!validatedFields.success) {
    return null;
  }

  const user = await getCurrentUser();

  const updatedPost: FullPost = await db.post.update({
    where: {
      id,
    },
    data: {
      ...validatedFields.data,
    },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          author: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
        take: PAGE_SIZE,
      },
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
  return updatedPost;
};
