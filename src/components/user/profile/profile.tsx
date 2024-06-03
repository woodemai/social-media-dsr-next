import { UserNotFound } from './not-found';

import { ProfileInfo } from './profile-info';

import { Suspense } from 'react';

import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';

import { getUserByIdWithSubscription } from '@/src/data/user';

interface ProfileProps {
  id: string;
  isOwner?: boolean;
}

export const Profile = async ({ id, isOwner = false }: ProfileProps) => {
  const response = await getUserByIdWithSubscription(id);

  if (!response.user) {
    return <UserNotFound />;
  }

  return (
    <>
      <ProfileInfo
        isOwner={isOwner}
        isSubscribed={response.isSubscribed}
        user={response.user}
      />
      {isOwner ? <PostForm /> : null}
      <Suspense fallback={<ListSkeleton />}>
        <PostList
          isOwner={isOwner}
          userId={id}
        />
      </Suspense>
    </>
  );
};
