'use client';

import { UserAvatar } from '../avatar';

import { User } from '@prisma/client';

import dynamic from 'next/dynamic';
import { useOptimistic, useState } from 'react';

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
}

export type ProfileState = Pick<User, 'bio' | 'name'>;

export const ProfileInfo = ({
  id,
  image: initialImage,
  name: initialName,
  bio: initialBio,
  isOwner = false,
  isSubscribed = false,
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
    <>
      <div className='flex gap-x-4'>
        <UserAvatar
          height={256}
          src={initialImage}
          width={256}
        />
        <h1 className='font-bold tracking-tight text-3xl'>{state.name}</h1>
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
    </>
  );
};
