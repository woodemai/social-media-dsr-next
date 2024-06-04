import { PostItem } from './item';

import { getPosts } from '@/data/post';

interface PostListProps {
  userId?: string;
  isOwner?: boolean;
}

export const PostList = async ({ userId, isOwner }: PostListProps) => {
  const posts = await getPosts({ userId });

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

  return (
    <ul className='divide-y border-x px-2'>
      {posts.map(post => (
        <PostItem
          isOwner={isOwner}
          key={post.id}
          post={post}
        />
      ))}
    </ul>
  );
};
