import { type Post, type User } from '@prisma/client';

import { type FullComment } from '@/entities/comment/types';

export type FullPost = {
  author: Pick<User, 'name' | 'image'>;
  _count: { likedUsers: number };
  likedUsers: { id: string }[];
  comments: FullComment[];
} & Post;
