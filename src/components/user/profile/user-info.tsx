'use client';

import { SubscriptionButton } from './subscripition-button';
import { UpdateDialog } from './update-dialog';

import { UserAvatar } from '../avatar';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  setSubscription,
  setUser,
  useUser,
} from '@/config/store/slices/user-slice';
import { useAppDispatch } from '@/config/store/store';
import { FullUser } from '@/data/user';

interface UserInfoProps {
  isOwner?: boolean;
  isSubscribed?: boolean;
  user: FullUser;
}

export const UserInfo = ({
  isOwner = false,
  isSubscribed = false,
  user,
}: UserInfoProps) => {
  const dispatch = useAppDispatch();
  const {
    name,
    bio,
    image,
    _count,
  } = useUser();

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setSubscription(isSubscribed));
  }, [user, dispatch, setUser, isSubscribed]);

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
            variant='link'
          >
            Подписчики: {_count?.subscribers}
          </Button>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'
          >
            Подписки: {_count?.subscribed}
          </Button>
        </div>
      </div>
    </div>
  );
};
