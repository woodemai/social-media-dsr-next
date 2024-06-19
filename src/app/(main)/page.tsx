import { Suspense } from 'react';

import { ListSkeleton, PostForm, PostList } from '@/widgets/post';

export default async function MainPage() {

  return (
    <div className='mx-auto w-full max-w-3xl space-y-4 py-8'>
      <PostForm />
      <Suspense fallback={<ListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
}
