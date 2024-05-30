import { ListSkeleton } from '@/components/post/list-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfileLoading = () => {
  return (
    <>
      <div className='flex gap-x-4'>
        <Skeleton className='rounded-full size-12' />
        <Skeleton className='w-40 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
      <Skeleton className='w-full h-5' />
      <ListSkeleton />
    </>
  );
};