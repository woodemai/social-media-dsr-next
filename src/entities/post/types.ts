import { type Comment, type Post, type User } from '@prisma/client';

export type FullPost = {
  author: Pick<User, 'name' | 'image'>;
  _count: { likedUsers: number };
  likedUsers: { id: string }[];
  comments: Comment[];
} & Post;
