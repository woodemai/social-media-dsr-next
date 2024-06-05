import { NotificationItem } from './item';

import { FullSubscriptionRequest } from '@/data/subscription-request';

interface NotificationListProps {
  notifications: FullSubscriptionRequest[];
}

export const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <ul className='space-y-4 divide-y'>
      {notifications.map(notification => (
        <li key={notification.id}>
          <NotificationItem notification={notification} />
        </li>
      ))}
    </ul>
  );
};
