import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { userSlice } from './slices/user-slice';
import { postSlice } from './slices/post-slice';

const reducer = combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [postSlice.reducerPath]: postSlice.reducer,
});

export const createStore = () => {
  return configureStore({
    reducer: combineReducers({
      [postSlice.reducerPath]: postSlice.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
    }),
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
