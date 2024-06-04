import { Suspense } from 'react';

import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';
import { UserNotFound } from '@/components/user/profile/not-found';
import { UserInfo } from '@/components/user/profile/user-info';
import { getCurrentUser, getIsSubscribed, getUserById } from '@/data/user';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params: { id } }: UserPageProps) {
  const user = await getUserById(id);
  const currentUser = await getCurrentUser();
  const isSubscribed = await getIsSubscribed(id);
  const isOwner = currentUser?.id === id;

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <>
      <UserInfo
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
}
