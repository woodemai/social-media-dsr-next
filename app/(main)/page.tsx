import { Suspense } from 'react';

import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';
import { ListSkeleton } from '@/components/post/list-skeleton';

export default function MainPage() {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-4 py-8'>
      <PostForm />
      <Suspense fallback={<ListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
}
