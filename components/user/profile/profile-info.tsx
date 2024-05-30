'use client';

import { UserAvatar } from '../avatar';

import { User } from '@prisma/client';

import dynamic from 'next/dynamic';
import { useOptimistic, useState } from 'react';

import { Button } from '@/components/ui/button';

const SubscribeButton = dynamic(() =>
  import('./subscribe-button').then(mob => mob.SubscribeButton),
);
const EditButton = dynamic(() =>
  import('./edit-button').then(mob => mob.EditButton),
);

interface ProfileInfoProps {
  image: string | null;
  name: string | null;
  bio: string | null;
  id: string;
  isOwner?: boolean;
  isSubscribed?: boolean;
  subscribersCount: number;
  subscribedCount: number;
}

export type ProfileState = Pick<User, 'bio' | 'name'>;

export const ProfileInfo = ({
  id,
  image: initialImage,
  name: initialName,
  bio: initialBio,
  isOwner = false,
  isSubscribed = false,
  subscribersCount,
  subscribedCount
}: ProfileInfoProps) => {
  const [state, setState] = useState<ProfileState>({
    name: initialName,
    bio: initialBio,
  });
  const [optimisticState, updateState] = useOptimistic<
    ProfileState,
    ProfileState
  >(state, newState => newState);

  return (
    <div className='flex gap-x-4 p-2 sm:p-0 justify-center sm:justify-start'>
      <UserAvatar
        height={256}
        size='lg'
        src={initialImage}
        width={256}
      />
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <h1 className='font-bold tracking-tight text-xl sm:text-3xl'>{state.name}</h1>
          {!isOwner ? (
            <SubscribeButton
              id={id}
              initialIsSubscribed={isSubscribed}
            />
          ) : (
            state.name && (
              <EditButton
                id={id}
                setState={setState}
                state={optimisticState}
                updateState={updateState}
              />
            )
          )}
        </div>
        <p>{state.bio}</p>
        <div>
          <Button className='pl-0 text-muted-foreground hover:text-foreground' size='sm' variant='link'>
            Подписчики:{' '}{subscribersCount}
          </Button>
          <Button className='pl-0 text-muted-foreground hover:text-foreground' size='sm' variant='link'>
            Подписки:{' '}{subscribedCount}
          </Button>
        </div>
      </div>
    </div>
  );
};
