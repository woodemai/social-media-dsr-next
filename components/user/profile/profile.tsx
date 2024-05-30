import { UserNotFound } from './not-found';

import { ProfileInfo } from './profile-info';

import { Suspense } from 'react';

import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';

import { getUserByIdWithSubscription } from '@/data/user';

interface ProfileProps {
  id: string;
  isOwner?: boolean;
}

export const Profile = async ({ id, isOwner = false }: ProfileProps) => {
  const user = await getUserByIdWithSubscription(id);

  if (!user) {
    return <UserNotFound />;
  }

  const { image, name, bio, _count } = user;

  return (
    <>
      <ProfileInfo
        bio={bio}
        id={id}
        image={image}
        isOwner={isOwner}
        isSubscribed={_count.subscribers > 0}
        name={name}
      />
      {isOwner ? <PostForm /> : null}
      <Suspense fallback={<ListSkeleton />}>
        <PostList userId={id} />
      </Suspense>
    </>
  );
};
