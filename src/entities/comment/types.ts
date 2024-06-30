import { type Comment, type User } from '@prisma/client';

export type FullComment = {
  author: Pick<User, 'name' | 'id' | 'image'>;
} & Pick<Comment, 'id' | 'body'>;
