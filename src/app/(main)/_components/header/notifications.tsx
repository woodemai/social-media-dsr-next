import { BellIcon } from '@radix-ui/react-icons';

import { getSubscriptionRequests } from '@/entities/subscription';
import { NotificationList } from '@/features/notification';
import { Badge } from '@/shared/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';

export const Notifications = async () => {
  const subscriptionRequests = await getSubscriptionRequests();

  return (
    <Dialog>
      <DialogTrigger
        className='relative'
        title='Уведомления'
      >
        {subscriptionRequests.length > 0 && (
          <Badge
            className='absolute right-[-10px] top-[-10px]'
            variant='notification'
          >
            {subscriptionRequests.length}
          </Badge>
        )}
        <BellIcon className='size-4' />
      </DialogTrigger>
      <DialogContent>
        <NotificationList notifications={subscriptionRequests} />
      </DialogContent>
    </Dialog>
  );
};
