import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState, useAppSelector } from 'src/config/store/store';
import { type FullPost } from '@/shared/api/post';

type postStateType = {
  posts: FullPost[];
};
const initialState: postStateType = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<FullPost[]>) => {
      state.posts = [...action.payload, ...state.posts];
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    resetPosts(state) {
      state.posts = [];
    }
  },
});

export const { addPosts, removePost, resetPosts } = postSlice.actions;

export const usePosts = () =>
  useAppSelector((state: RootState) => state.post.posts);
