'use client';
import { AppStore, createStore } from './store';

import { useRef } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;