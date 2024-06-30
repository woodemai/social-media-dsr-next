import { type FullComment } from '@/entities/comment/types';
import { type FullPost } from '@/entities/post';

export type PostState = {
  posts: FullPost[];
};

type PostActions = {
  addPosts: (posts: FullPost[]) => void;
  addPost: (post: FullPost) => void;
  updatePost: (id: string, updatedData: Partial<FullPost>) => void;
  addComment: (postId: string, comment: FullComment) => void;
  updateComment: (
    postId: string,
    commentId: string,
    updatedData: Partial<FullComment>,
  ) => void;
  removeComment: (postId: string, commentId: string) => void;
  removePost: (id: string) => void;
  resetPosts: () => void;
};

export type PostStore = PostState & PostActions;

export const initialPostState: PostState = {
  posts: [],
};
