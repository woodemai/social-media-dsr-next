import { UserNotFound } from './not-found';

import { PostList } from '../../post/list';
import { ListSkeleton } from '../../post/list-skeleton';
import { UserAvatar } from '../avatar';
import { SubscribeButton } from '../subscribe-button';

import { Suspense } from 'react';

import { getUserByIdWithSubscription } from '@/data/user';

interface ProfileProps {
  id: string;
  owner?: boolean;
}

export const Profile = async ({ id, owner = false }: ProfileProps) => {
  const user = await getUserByIdWithSubscription(id);

  if (!user) {
    return <UserNotFound />;
  }

  const { image, name, bio, _count } = user;

  return (
    <>
      <div className='flex gap-x-4'>
        <UserAvatar
          height={256}
          src={image}
          width={256}
        />
        <h1 className='font-bold tracking-tight text-3xl'>{name}</h1>
        {!owner && (
          <SubscribeButton
            id={id}
            initialIsSubscribed={_count.subscribers > 0}
          />
        )}
      </div>
      <p>{bio}</p>
      <Suspense fallback={<ListSkeleton />}>
        <PostList userId={id} />
      </Suspense>
    </>
  );
};
