import { Skeleton } from '@/shared/ui/skeleton';
import { ListSkeleton } from '@/widgets/post/ui/list/list-skeleton';

export const ProfileLoading = () => {
  return (
    <>
      <div className='flex gap-x-4'>
        <Skeleton className='size-12 rounded-full' />
        <Skeleton className='h-10 w-40' />
        <Skeleton className='h-10 w-28' />
      </div>
      <Skeleton className='h-5 w-full' />
      <ListSkeleton />
    </>
  );
};
