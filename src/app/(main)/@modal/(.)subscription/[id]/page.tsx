import { getSubscriptionInfo } from '@/entities/subscription/data';
import { type SubscriptionTabs } from '@/entities/subscription/types';
import { SubscriptionMenuModal } from '@/entities/subscription/ui/menu/modal';

type SubscriptionModalPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    tab: SubscriptionTabs;
  };
};

const SubscriptionModalPage = async ({
  params: { id },
  searchParams: { tab },
}: SubscriptionModalPageProps) => {
  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <SubscriptionMenuModal
      tab={tab}
      subscriptionInfo={subscriptionInfo}
    />
  );
};

export default SubscriptionModalPage;
