'use client';

import { useTransition } from 'react';

import { handleSubscribeAction } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  setSubscription,
  setUser,
  useSubscription,
  useUser,
} from '@/config/store/slices/user-slice';
import { useAppDispatch } from '@/config/store/store';

export const SubscriptionButton = () => {
  const dispatch = useAppDispatch();

  const { id } = useUser();
  const isSubscribed = useSubscription();

  const [isPending, startTransition] = useTransition();

  const handleSubscribe = () => {
    const isSubscribedBefore = isSubscribed;
    dispatch(setSubscription(!isSubscribed));
    startTransition(async () => {
      const response = await handleSubscribeAction(id, isSubscribedBefore);
      dispatch(setUser(response));
      dispatch(setSubscription(response.subscribers.length > 0));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleSubscribe}
      variant={isSubscribed ? 'outline' : 'default'}
    >
      {isSubscribed ? 'Отписаться' : 'Подписаться'}
    </Button>
  );
};
