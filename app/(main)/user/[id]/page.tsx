import { Suspense } from 'react';

import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';
import { UserAvatar } from '@/components/user/avatar';
import { SubscribeButton } from '@/components/user/subscribe-button';
import { getUserByIdWithSubscription } from '@/data/user';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params: { id } }: UserPageProps) {
  const user = await getUserByIdWithSubscription(id);

  if (!user) {
    return (
      <div className='flex justify-center items-center flex-col gap-y-4'>
        <h3 className='font-bold text-3xl tracking-tight'>
          Пользователь не найден
        </h3>
        <p>Повторите попытку позже</p>
      </div>
    );
  }

  const { image, name, bio } = user;
  return (
    <div className='mx-auto w-full max-w-3xl py-8 space-y-4'>
      <div className='flex gap-x-4'>
        <UserAvatar
          height={256}
          src={image}
          width={256}
        />
        <h1 className='font-bold tracking-tight text-3xl'>{name}</h1>
      </div>
      <p>{bio}</p>
      <SubscribeButton id={id} initialIsSubscribed={user._count.subscribers > 0} />
      <Suspense fallback={<ListSkeleton />}>
        <PostList userId={id} />
      </Suspense>
    </div>
  );
}
