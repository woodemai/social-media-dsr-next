'use server';

import { type Post, type User } from '@prisma/client';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { db } from '@/config/prisma';

import { getCurrentUser } from './user';

export type FullPost = {
  author: Pick<User, 'name' | 'image'>;
  _count: { likedUsers: number };
  likedUsers: { id: string }[];
} & Post;

interface getPostsProps {
  userId?: string;
  page?: number;
}
/**
 * If we are passing `userId` we will look for posts of user with this id.
 *
 * If not we will look for posts of users of current user subscriptions
 */
export const getPosts = async ({
  userId,
  page = 1,
}: getPostsProps): Promise<FullPost[]> => {
  const user = await getCurrentUser();

  const author =
    userId === user.id
      ? {
          id: userId,
        }
      : {
          OR: [
            {
              subscribers: {
                some: {
                  id: user.id,
                },
              },
            },
            {
              id: user.id,
            },
          ],
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
