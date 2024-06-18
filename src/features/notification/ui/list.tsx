'use client';

import { useState } from 'react';

import { type FullSubscriptionRequest } from '@/shared/api/subscription-request';

import { NotificationItem } from './item';

interface NotificationListProps {
  notifications: FullSubscriptionRequest[];
}

export const NotificationList = ({
  notifications: initialNotifications,
}: NotificationListProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleNotificationRemove = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id),
    );
  };
  console.log('notifications', notifications.length);

  if (notifications.length === 0) {
    return <h1>Нет новых уведомлений</h1>;
  }

  return (
    <ul className='space-y-4 divide-y'>
      {notifications.map(notification => (
        <li key={notification.id}>
          <NotificationItem
            notification={notification}
            onNotificationRemove={handleNotificationRemove}
          />
        </li>
      ))}
    </ul>
  );
};
