'use client';

import { useTransition } from 'react';

import {
  setSubscription,
  setUser,
  useSubscription,
  useUser,
} from '@/config/store/slices/user-slice';
import { useAppDispatch } from '@/config/store/store';
import { subscribeAction } from '@/shared/actions/user';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/ui/use-toast';

export const SubscriptionButton = () => {
  const dispatch = useAppDispatch();

  const user = useUser();
  const isSubscribed = useSubscription();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  if (!user) return null;

  const { id } = user;

  const handleSubscribe = () => {
    startTransition(async () => {
      const { user, request, error } = await subscribeAction(id, isSubscribed);

      if (user) {
        dispatch(setUser(user));

        if (user.subscribers) {
          dispatch(setSubscription(user.subscribers.length > 0));
        }
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
      variant={isSubscribed ? 'outline' : 'default'}>
      {isSubscribed ? 'Отписаться' : 'Подписаться'}
    </Button>
  );
};
