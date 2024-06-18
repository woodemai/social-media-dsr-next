import { Suspense } from 'react';

import {
  getCurrentUser,
  getIsSubscribed,
  getUserById,
} from '@/shared/api/user';
import { ListSkeleton, PostForm, PostList } from '@/widgets/post';
import { UserInfo, UserNotFound } from '@/widgets/user';

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
  const isShowingPosts = isSubscribed || isOwner || !user?.isPrivate;
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
      {isShowingPosts ? (
        <Suspense fallback={<ListSkeleton />}>
          <PostList
            isOwner={isOwner}
            userId={id}
          />
        </Suspense>
      ) : (
        <div className='flex flex-col justify-center items-center gap-y-4 text-primary text-center'>
          <span className='text-3xl'>🔒</span>
          <h1 className='font-bold tracking-tight text-3xl'>
            Приватный профиль
          </h1>
          <p className='text-muted-foreground'>
            Подпишитесь чтобы смотреть посты
          </p>
        </div>
      )}
    </>
  );
}
