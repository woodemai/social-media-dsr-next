import {
  type SubscriptionInfo,
  SubscriptionTabs,
} from '@/entities/subscription/types';
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
  subscriptionInfo: { subscribed, subscribers },
}: SubscriptionMenuProps) => {
  return (
    <Tabs defaultValue={tab}>
      <TabsList>
        <TabsTrigger value={SubscriptionTabs.SUBSCRIBED}>Подписки</TabsTrigger>
        <TabsTrigger value={SubscriptionTabs.SUBSCRIBERS}>
          Подписчики
        </TabsTrigger>
      </TabsList>
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
