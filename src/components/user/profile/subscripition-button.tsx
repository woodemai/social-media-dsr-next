'use client';

import { useTransition } from 'react';

import { subscribeAction } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleSubscribe = () => {
    startTransition(async () => {
      const { user, request, error } = await subscribeAction(
        id,
        isSubscribed,
      );

      if (user) {
        dispatch(setUser(user));
        dispatch(setSubscription(user.subscribers.length > 0));
      } else if (error) {
        toast({
          title: 'Подписка',
          description: error,
          variant: 'destructive',
        });
      } else if (request) {
        toast({
          title: 'Подписка',
          description: 'Запрос на подписку успешно отправлен',
        });
      }
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
