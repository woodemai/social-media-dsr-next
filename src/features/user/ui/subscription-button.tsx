'use client';

import { useTransition } from 'react';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/ui/use-toast';
import { useStore } from '@/config/store';
import { subscribeAction } from '@/entities/subscription';

export const SubscriptionButton = () => {
  const { user, isSubscribed, setUser, setSubscription } = useStore(
    state => state.userSlice,
  );

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  if (!user) return null;

  const { id } = user;

  const handleSubscribe = () => {
    startTransition(async () => {
      const { user, request, error } = await subscribeAction(id, isSubscribed);

      if (user) {
        setUser(user);

        if (user.subscribers) {
          setSubscription(user.subscribers.length > 0);
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
