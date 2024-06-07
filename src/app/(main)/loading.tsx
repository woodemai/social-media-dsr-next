import { Skeleton } from '@/shared/ui/skeleton';
import { ListSkeleton } from '@/widgets/post';

export default function MainLoading() {
  return (
    <div className='space-y-4 mx-auto w-full max-w-3xl py-8'>
      <Skeleton className='w-full h-20' />
      <ListSkeleton />
    </div>
  );
}
