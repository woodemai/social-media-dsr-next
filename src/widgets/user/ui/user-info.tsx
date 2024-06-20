'use client';

import { useEffect } from 'react';

import { useStore } from '@/config/store';
import { type FullUser } from '@/entities/user';
import { SubscriptionButton, UpdateDialog, UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';

type UserInfoProps = {
  isOwner?: boolean;
  isSubscribed?: boolean;
  user: FullUser;
};

export const UserInfo = ({
  isOwner = false,
  isSubscribed = false,
  user: initialUser,
}: UserInfoProps) => {
  const { user, setUser, setSubscription } = useStore(state => state.userSlice);

  useEffect(() => {
    setUser(initialUser);
    setSubscription(isSubscribed);
  }, [initialUser, isSubscribed, setSubscription, setUser]);

  return (
    <div className='flex justify-center gap-x-4 p-2 sm:justify-start sm:p-0'>
      <UserAvatar
        height={256}
        size='lg'
        src={user?.image}
        width={256}
      />
      <div className='space-y-4'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <h1 className='text-xl font-bold tracking-tight sm:text-3xl'>
            {user?.name}
          </h1>
          {!isOwner ? <SubscriptionButton /> : <UpdateDialog />}
        </div>
        <p>{user?.bio}</p>
        <div>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'
          >
            Подписчики: {user?._count.subscribers}
          </Button>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'
          >
            Подписки: {user?._count.subscribed}
          </Button>
        </div>
      </div>
    </div>
  );
};
