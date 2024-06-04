import { RootState, useAppSelector } from '../store';

import { User } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userStateType = {
  user: User;
  isSubscribed: boolean;
};
const initialState: userStateType = {
  user: {} as User,
  isSubscribed: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setSubscription(state, action: PayloadAction<boolean>) {
      state.isSubscribed = action.payload;
    },
    updateUser(
      state,
      action: PayloadAction<Partial<Pick<User, 'name' | 'bio' | 'password' | 'isPrivate'>>>,
    ) {
      const { name, bio, isPrivate } = action.payload;
      if (state.user) {
        if (name) state.user.name = name;
        if (bio) state.user.bio = bio;
        if (isPrivate) state.user.isPrivate = isPrivate;
      }
    },
  },
});

export const { setUser, updateUser, setSubscription } = userSlice.actions;

export const useUser = () =>
  useAppSelector((state: RootState) => state.user.user);

export const useSubscription = () => useAppSelector((state: RootState) => state.user.isSubscribed);