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

const getAuthor = ({selectedUserId, currentUserId}:{selectedUserId?: string, currentUserId?: string}) => {
  if (selectedUserId) {
    return {
      id: selectedUserId,
    };
  }
  return {
    OR: [
      {
        subscribers: {
          some: {
            id: currentUserId,
          },
        },
      },
      {
        id: currentUserId,
      },
    ],
  };
};

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

  return db.post.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    where: {
      author: getAuthor({ selectedUserId: userId, currentUserId: user.id}),
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
