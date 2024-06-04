import { ListSkeleton } from '@/components/post/list-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function MainLoading() {
  return (
    <div className='space-y-4 mx-auto w-full max-w-3xl py-8'>
      <Skeleton className='w-full h-20' />
      <ListSkeleton />
    </div>
  );
}
