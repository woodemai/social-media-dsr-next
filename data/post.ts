import { currentUser } from './user';

import { Post, User } from '@prisma/client';

import { db } from '@/lib/prisma';

export type FullPost = { author: Pick<User, 'name' | 'image'> } & Post;

export const getPosts = async (userId?: string): Promise<FullPost[]> => {
  const user = await currentUser();
  if (!user) return [];
  if (userId) {
    return db.post.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  return await db.post.findMany({
    where: {
      author: {
        subscribers: {
          some: {
            id: user.id,
          },
        },
      },
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
