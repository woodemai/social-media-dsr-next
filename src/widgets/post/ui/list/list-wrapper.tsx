import { ListClient } from './list-client';

import { getPosts } from '@/shared/api/post';

interface PostListProps {
  userId?: string;
  isOwner?: boolean;
}

export const PostList = async ({ userId, isOwner }: PostListProps) => {
  const posts = await getPosts({ userId, page: 1 });

  if (!posts.length) {
    return (
      <div className='grid place-content-center gap-y-4 text-center h-full'>
        <div className='p-4 space-y-4'>
          <h2 className='font-bold tracking-tight text-3xl'>
            Посты не найдены
          </h2>
          <p>Повторите попытку позже</p>
        </div>
      </div>
    );
  }

  return <ListClient isOwner={isOwner} posts={posts} userId={userId} />;


};
