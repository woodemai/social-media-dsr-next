'use server';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { db } from '@/config/prisma';
import { postSchema, type postSchemaType } from '@/entities/post/schemas';
import { getCurrentUser } from '@/entities/user/data';

import { type FullPost } from './types';

export const postUpsertAction = async (
  values: postSchemaType,
  postId?: string,
) => {
  const validatedFields = postSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Неверно заполнены поля',
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: 'Пользователь не авторизован',
    };
  }

  if (postId) {
    const post: FullPost = await db.post.update({
      data: {
        ...validatedFields.data,
      },
      where: {
        id: postId,
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
      post: post,
    };
  }

  const post: FullPost = await db.post.create({
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
    post: post,
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
