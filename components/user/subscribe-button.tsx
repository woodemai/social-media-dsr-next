'use client';

import { Button } from '../ui/button';

import { useOptimistic, useState, useTransition } from 'react';

import { subscribeToUser, unsubscribeFromUser } from '@/actions/user';

interface SubscribeButtonProps {
  id: string;
  initialIsSubscribed: boolean;
}

export const SubscribeButton = ({
  id,
  initialIsSubscribed,
}: SubscribeButtonProps) => {
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const [isPending, startTransition] = useTransition();
  const [optimisticIsSubscribed, toggleSubscription] = useOptimistic<
    boolean,
    void
  >(isSubscribed, isSubscribed => !isSubscribed);

  const handleSubscribe = () => {
    startTransition(async () => {
      toggleSubscription();
      if (isSubscribed) {
        const response = await unsubscribeFromUser(id);
        if (response) {
          setIsSubscribed(response._count.subscribers > 0);
        }
      } else {
        const response = await subscribeToUser(id);
        if (response) {
          setIsSubscribed(response._count.subscribers > 0);
        }
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleSubscribe}
      variant={optimisticIsSubscribed ? 'outline' : 'default'}
    >
      {optimisticIsSubscribed ? 'Отписаться' : 'Подписаться'}
    </Button>
  );
};
