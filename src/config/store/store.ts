import { createStore } from 'zustand';

import {
  initialPostState,
  type PostState,
  type PostStore,
} from './slices/post-slice';
import {
  initialUserState,
  type UserState,
  type UserStore,
} from './slices/user-slice';

export type Store = {
  postSlice: PostStore;
  userSlice: UserStore;
};
export type StoreState = {
  postSlice: PostState;
  userSlice: UserState;
};

export const defaultInitialState: StoreState = {
  postSlice: initialPostState,
  userSlice: initialUserState,
};

export const getStore = (initialState: StoreState = defaultInitialState) => {
  const { postSlice, userSlice } = initialState;
  return createStore<Store>()(set => ({
    userSlice: {
      ...userSlice,
      setUser(newUser) {
        set(({ userSlice }) => ({
          userSlice: { ...userSlice, user: newUser },
        }));
      },
      setSubscription(isSubscribed) {
        set(({ userSlice }) => ({
          userSlice: { ...userSlice, isSubscribed },
        }));
      },
      updateUser({ name, bio, isPrivate }) {
        set(({ userSlice }) => {
          if (userSlice.user) {
            if (name) userSlice.user.name = name;
            if (bio) userSlice.user.bio = bio;
            if (isPrivate) userSlice.user.isPrivate = isPrivate;
          }
          return { userSlice: { ...userSlice, user: userSlice.user } };
        });
      },
    },
    postSlice: {
      ...postSlice,
      addPost(post) {
        set(({ postSlice }) => ({
          postSlice: {
            ...postSlice,
            posts: [post, ...postSlice.posts],
          },
        }));
      },
      addComment(postId, comment) {
        set(({ postSlice }) => ({
          postSlice: {
            ...postSlice,
            posts: postSlice.posts.map(post => {
              if (post.id === postId) {
                return { ...post, comments: [...post.comments, comment] };
              }
              return post;
            }),
          },
        }));
      },
      removeComment(postId, commentId) {
        set(({ postSlice }) => ({
          postSlice: {
            ...postSlice,
            posts: postSlice.posts.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: post.comments.filter(
                    comment => comment.id !== commentId,
                  ),
                };
              }
              return post;
            }),
          },
        }));
      },
      addPosts(posts) {
        set(({ postSlice }) => ({
          postSlice: {
            ...postSlice,
            posts: [...postSlice.posts, ...posts],
          },
        }));
      },
      removePost(id) {
        set(({ postSlice }) => ({
          postSlice: {
            ...postSlice,
            posts: postSlice.posts.filter(post => post.id !== id),
          },
        }));
      },
      resetPosts() {
        set(state => ({ postSlice: { ...state.postSlice, posts: [] } }));
      },
    },
  }));
};
