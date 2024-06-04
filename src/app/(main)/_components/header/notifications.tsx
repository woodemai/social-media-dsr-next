import { NotificationList } from '@/components/notification/list';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getSubscriptionRequests } from '@/data/subscription-request';
import { BellIcon } from '@radix-ui/react-icons';

export const Notifications = async () => {
  const subscriptionRequests = await getSubscriptionRequests();

  return (
    <Dialog>
      <DialogTrigger className='relative'>
        {subscriptionRequests.length > 0 && (
          <Badge variant='notification' className='absolute top-[-10px] right-[-10px]'>{subscriptionRequests.length}</Badge>
        )}
        <BellIcon className='size-6' />
      </DialogTrigger>
      <DialogContent>
        {subscriptionRequests.length > 0 ? (
          <NotificationList notifications={subscriptionRequests} />
        ) : (
          <h1>No notifications</h1>
        )}
      </DialogContent>
    </Dialog>
  );
};
