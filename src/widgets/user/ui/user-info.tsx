'use client';

import { useEffect } from 'react';

import {
  setSubscription,
  setUser,
  useUser,
} from '@/config/store/slices/user-slice';
import { useAppDispatch } from '@/config/store/store';
import { SubscriptionButton, UpdateDialog, UserAvatar } from '@/features/user';
import { type FullUser } from '@/shared/api/user';
import { Button } from '@/shared/ui/button';

interface UserInfoProps {
  isOwner?: boolean;
  isSubscribed?: boolean;
  user: FullUser;
}

export const UserInfo = ({
  isOwner = false,
  isSubscribed = false,
  user: initialUser,
}: UserInfoProps) => {
  const dispatch = useAppDispatch();
  const user = useUser();

  useEffect(() => {
    dispatch(setUser(initialUser));
    dispatch(setSubscription(isSubscribed));
  }, [dispatch, isSubscribed, initialUser]);

  if(!user) return null;

  const { bio, image, name, _count } = user;

  return (
    <div className='flex gap-x-4 p-2 sm:p-0 justify-center sm:justify-start'>
      <UserAvatar
        height={256}
        size='lg'
        src={image}
        width={256}
      />
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <h1 className='font-bold tracking-tight text-xl sm:text-3xl'>
            {name}
          </h1>
          {!isOwner ? <SubscriptionButton /> : <UpdateDialog />}
        </div>
        <p>{bio}</p>
        <div>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'>
            Подписчики: {_count?.subscribers}
          </Button>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'>
            Подписки: {_count?.subscribed}
          </Button>
        </div>
      </div>
    </div>
  );
};
