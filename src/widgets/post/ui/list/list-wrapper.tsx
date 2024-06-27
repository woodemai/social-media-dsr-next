import { getPosts } from '@/entities/post';
import { getCurrentUser } from '@/entities/user/data';

import { ListClient } from './list-client';

type PostListProps = {
  userId?: string;
};

export const PostList = async ({ userId }: PostListProps) => {
  const posts = await getPosts({ userId, page: 1 });
  const currentUser = await getCurrentUser();

  if (!posts.length) {
    return (
      <div className='grid h-full place-content-center gap-y-4 text-center'>
        <div className='space-y-4 p-4'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Посты не найдены
          </h2>
          <p>Повторите попытку позже</p>
        </div>
      </div>
    );
  }

  return (
    <ListClient
      currentUserId={currentUser.id}
      posts={posts}
      userId={userId}
    />
  );
};
