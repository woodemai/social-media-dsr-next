'use server';

import { getCurrentUser } from './user';

import { Post, User } from '@prisma/client';

import { db } from '@/config/prisma';

const PAGE_SIZE = 10;

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
  const user = await getCurrentUser();
  if (!user) return [];
  const author = userId
    ? {
      id: userId,
    }
    : {
      subscribers: {
        some: {
          id: user.id,
        },
      },
    };
  return db.post.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      author,
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
