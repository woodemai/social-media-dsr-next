import { getSubscriptionInfo } from '@/entities/subscription/data';
import { type SubscriptionTabs } from '@/entities/subscription/types';
import { SubscriptionMenu } from '@/entities/subscription/ui/menu/menu';

type SubscriptionPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    tab: SubscriptionTabs;
  };
};

const SubscriptionPage = async ({
  params: { id },
  searchParams: { tab },
}: SubscriptionPageProps) => {
  const subscriptionInfo = await getSubscriptionInfo(id);

  return (
    <div className='mt-8 flex h-full items-center justify-center'>
      <SubscriptionMenu
        tab={tab}
        subscriptionInfo={subscriptionInfo}
      />
    </div>
  );
};

export default SubscriptionPage;
