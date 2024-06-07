'use client';



import { useTransition } from 'react';

import { subscribeAcceptAction, subscribeRejectAction } from '@/shared/actions/user';
import { FullSubscriptionRequest } from '@/shared/api/subscription-request';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/ui/use-toast';

interface NotificationItemProps {
  notification: FullSubscriptionRequest;
  onNotificationRemove: (id: string) => void;
}

export const NotificationItem = ({ notification, onNotificationRemove }: NotificationItemProps) => {

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      await subscribeAcceptAction(notification);
      toast({
        title: 'Принято',
        description: `Вы применяли подписку от ${notification.requestBy.name}`,
      });
      onNotificationRemove(notification.id);
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await subscribeRejectAction(notification);
      toast({
        title: 'Отклонено',
        description: `Вы отклонили запрос на подписку от ${notification.requestBy.name}`,
      });
      onNotificationRemove(notification.id);
    });
  };

  return (
    <div className='space-y-2'>
      <h4>{notification.requestBy.name} хочет на вас подписаться!</h4>
      <div className='space-x-4'>
        <Button
          disabled={isPending}
          onClick={handleAccept}
          size='sm'
        >
          Принять
        </Button>
        <Button
          disabled={isPending}
          onClick={handleReject}
          size='sm'
          variant='secondary'
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};
