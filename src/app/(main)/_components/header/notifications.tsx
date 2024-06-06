import { BellIcon } from '@radix-ui/react-icons';

import { NotificationList } from '@/components/notification/list';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getSubscriptionRequests } from '@/data/subscription-request';

export const Notifications = async () => {
  const subscriptionRequests = await getSubscriptionRequests();

  return (
    <Dialog>
      <DialogTrigger className='relative'>
        {subscriptionRequests.length > 0 && (
          <Badge className='absolute top-[-10px] right-[-10px]' variant='notification'>{subscriptionRequests.length}</Badge>
        )}
        <BellIcon className='size-4' />
      </DialogTrigger>
      <DialogContent>
        <NotificationList notifications={subscriptionRequests} />
      </DialogContent>
    </Dialog>
  );
};
