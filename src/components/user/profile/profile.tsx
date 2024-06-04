import { UserNotFound } from './not-found';

import { ProfileInfo } from './profile-info';

import { Suspense } from 'react';

import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';

import { getCurrentUser, getIsSubscribed, getUserById } from '@/data/user';

interface ProfileProps {
  id: string;
}

export const Profile = async ({ id }: ProfileProps) => {
  const user = await getUserById(id);
  const currentUser = await getCurrentUser();

  if (!user) {
    return <UserNotFound />;
  }

  const isOwner = currentUser?.id === user.id;
  const isSubscribed = await getIsSubscribed(id);

  return (
    <>
      <ProfileInfo
        isOwner={isOwner}
        isSubscribed={isSubscribed}
        user={user}
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
