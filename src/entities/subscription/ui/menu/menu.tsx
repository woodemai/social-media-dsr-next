import { Link } from 'next-view-transitions';

import {
  type SubscriptionInfo,
  SubscriptionTabs,
} from '@/entities/subscription/types';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { SubscriptionMenuItem } from './menu-item';

type SubscriptionMenuProps = {
  tab?: SubscriptionTabs;
  subscriptionInfo: SubscriptionInfo;
  closeDialog?: () => void;
};

export const SubscriptionMenu = ({
  tab,
  closeDialog,
  subscriptionInfo: { subscribed, subscribers, name, id },
}: SubscriptionMenuProps) => {
  return (
    <Tabs defaultValue={tab}>
      <div className='flex gap-x-2 justify-between items-end'>
        <div className='flex items-center max-w-fit gap-x-2 rounded-md bg-card px-4'>
          <span className='whitespace-nowrap'>Информация о</span>
          <Button asChild variant='link' className='p-0 font-bold'>
            <Link href={`/user/${id}`}>{name}</Link>
          </Button>
        </div>
        <TabsList>
          <TabsTrigger value={SubscriptionTabs.SUBSCRIBED}>Подписки</TabsTrigger>
          <TabsTrigger value={SubscriptionTabs.SUBSCRIBERS}>
            Подписчики
          </TabsTrigger>
        </TabsList>
      </div>
      <SubscriptionMenuItem
        closeDialog={closeDialog}
        users={subscribed}
        value={SubscriptionTabs.SUBSCRIBED}
      />
      <SubscriptionMenuItem
        closeDialog={closeDialog}
        users={subscribers}
        value={SubscriptionTabs.SUBSCRIBERS}
      />
    </Tabs>
  );
};
