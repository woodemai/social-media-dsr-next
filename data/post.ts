import { currentUser } from './user';

import { Post, User } from '@prisma/client';

import { db } from '@/lib/prisma';

export type FullPost = {
  author: Pick<User, 'name' | 'image'>;
  _count: { likedUsers: number };
  likedUsers: { id: string }[];
} & Post;

interface getPostsProps {
  userId?: string;
  page?: number;
}

export const getPosts = async ({
  userId,
  page = 1,
}: getPostsProps): Promise<FullPost[]> => {
  const user = await currentUser();
  if (!user) return [];
  if (userId) {
    return db.post.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        author: {
          id: userId,
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  return await db.post.findMany({
    skip: (page - 1) * 10,
    take: 10,
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
    orderBy: {
      createdAt: 'desc',
    },
  });
};
