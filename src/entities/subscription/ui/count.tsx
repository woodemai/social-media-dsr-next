import { Link } from 'next-view-transitions';

import { SubscriptionTabs } from '@/entities/subscription/types';
import { Button } from '@/shared/ui/button';

export const SubscriptionCount = ({
  id,
  count,
  tab = SubscriptionTabs.SUBSCRIBED,
  label,
}: {
  id: string;
  count?: number;
  tab?: SubscriptionTabs;
  label: string;
}) => {
  if (!count) return null;

  return (
    <Button
      className='pl-0 text-muted-foreground hover:text-foreground'
      size='sm'
      variant='link'
      asChild
    >
      <Link href={`/subscription/${id}/?tab=${tab}`}>
        {label} {count}
      </Link>
    </Button>
  );
};
