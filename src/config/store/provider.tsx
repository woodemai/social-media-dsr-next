'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';

import { type Store, getStore } from './store';

export type StoreApi = ReturnType<typeof getStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode; }) => {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = getStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useZustandStore(counterStoreContext, selector);
};
