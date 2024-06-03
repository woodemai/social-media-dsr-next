'use client';

import { UpdateDialog } from './update-dialog';
import { SubscriptionButton } from './subscripition-button';

import { UserAvatar } from '../avatar';

import { User } from '@prisma/client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  setSubscription,
  setUser,
  useUser,
} from '@/src/lib/store/slices/user-slice';
import { useAppDispatch } from '@/src/lib/store/store';

interface ProfileInfoProps {
  isOwner?: boolean;
  isSubscribed?: boolean;
  user: User;
}

export const ProfileInfo = ({
  isOwner = false,
  isSubscribed = false,
  user,
}: ProfileInfoProps) => {
  const dispatch = useAppDispatch();
  const { name, bio, image } = useUser();

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setSubscription(isSubscribed));
  }, [user, dispatch, setUser]);

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
            Подписчики: {/**TODO: subscribers count */}
          </Button>
          <Button
            className='pl-0 text-muted-foreground hover:text-foreground'
            size='sm'
            variant='link'
          >
            Подписки: {/**TODO: subscribed count */}
          </Button>
        </div>
      </div>
    </div>
  );
};
