import { type FullPost } from '@/entities/post';

export type PostState = {
  posts: FullPost[];
};

type PostActions = {
  addPosts: (posts: FullPost[]) => void;
  addPost: (post: FullPost) => void;
  removePost: (id: string) => void;
  resetPosts: () => void;
};

export type PostStore = PostState & PostActions;

export const initialPostState: PostState = {
  posts: [],
};
