import { PostForm } from '@/components/post/form';
import { PostList } from '@/components/post/list';

export default function MainPage() {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-4 py-8'>
      <PostForm />
      <PostList />
    </div>
  );
}