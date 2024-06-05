'use client';

import { Button } from '../ui/button';

import { useToast } from '../ui/use-toast';

import { subscribeAcceptAction, subscribeRejectAction } from '@/actions/user';
import { FullSubscriptionRequest } from '@/data/subscription-request';

interface NotificationItemProps {
  notification: FullSubscriptionRequest;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {

  const { toast } = useToast();

  const handleAccept = () => {
    subscribeAcceptAction(notification).then(() => {
      toast({
        title: 'Принято',
        description: `Вы применяли подписку от ${notification.requestBy.name}`,
      });
    });
  };

  const handleReject = () => {
    subscribeRejectAction(notification).then(() => {
      toast({
        title: 'Отклонено',
        description: `Вы отклонили запрос на подписку от ${notification.requestBy.name}`,
      });
    });;
  };

  return (
    <div className='space-y-2'>
      <h4>{notification.requestBy.name} хочет на вас подписаться!</h4>
      <div className='space-x-4'>
        <Button
          onClick={handleAccept}
          size='sm'
        >
          Принять
        </Button>
        <Button
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
