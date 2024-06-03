'use client';


import { useOptimistic, useState, useTransition } from 'react';

import { subscribeToUser, unsubscribeFromUser } from '@/actions/user';
import { Button } from '@/components/ui/button';

interface SubscribeButtonProps {
  id: string;
  initialIsSubscribed: boolean;
  onSubscribersCount: (isIncreasing: boolean) => void;
  setSubscribersCount: (value:number) => void
}

export const SubscribeButton = ({
  id,
  initialIsSubscribed,
  onSubscribersCount: handleSubscribersCount,
  setSubscribersCount
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
      handleSubscribersCount(!isSubscribed);
      if (isSubscribed) {
        const response = await unsubscribeFromUser(id);
        if (response) {
          setIsSubscribed(response.subscribers.length > 0);
          setSubscribersCount(response._count.subscribers);
        }
      } else {
        const response = await subscribeToUser(id);
        if (response) {
          setIsSubscribed(response.subscribers.length > 0);
          setSubscribersCount(response._count.subscribers);
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
