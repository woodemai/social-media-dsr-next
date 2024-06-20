import { getPosts } from '@/entities/post';
import { ListClient } from './list-client';
import { getCurrentUser } from '@/entities/user/data';

interface PostListProps {
  userId?: string;
}

export const PostList = async ({ userId }: PostListProps) => {
  const posts = await getPosts({ userId, page: 1 });
  const currentUser = await getCurrentUser();

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
    <ListClient
      currentUserId={currentUser.id}
      posts={posts}
      userId={userId}
    />
  );
};
