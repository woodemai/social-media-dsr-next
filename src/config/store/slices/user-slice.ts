import { type FullUser } from '@/entities/user';

export type UserState = {
  user?: FullUser;
  isSubscribed: boolean;
};

export type UserActions = {
  setUser: (user: FullUser) => void;
  setSubscription: (isSubscribed: boolean) => void;
  updateUser: (
    user: Partial<Pick<FullUser, 'name' | 'bio' | 'password' | 'isPrivate'>>,
  ) => void;
};

export type UserStore = UserState & UserActions;

export const initialUserState: UserState = {
  user: undefined,
  isSubscribed: false,
};
