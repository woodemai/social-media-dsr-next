'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  type SubscriptionInfo,
  type SubscriptionTabs,
} from '@/entities/subscription/types';
import { Dialog, DialogContent } from '@/shared/ui/dialog';

import { SubscriptionMenu } from './menu';

type SubscriptionMenuProps = {
  tab?: SubscriptionTabs;
  subscriptionInfo: SubscriptionInfo;
};

export const SubscriptionMenuModal = ({
  tab,
  subscriptionInfo,
}: SubscriptionMenuProps) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleOpen = () => {
    if (open) {
      setOpen(false);
      router.back();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={handleOpen}
    >
      <DialogContent className='border-none bg-transparent shadow-none'>
        <SubscriptionMenu
          closeDialog={handleOpen}
          tab={tab}
          subscriptionInfo={subscriptionInfo}
        />
      </DialogContent>
    </Dialog>
  );
};
