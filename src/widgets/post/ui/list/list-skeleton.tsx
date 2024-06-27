import { Skeleton } from '@/shared/ui/skeleton';

export const ListSkeleton = () => {
  return (
    <ul className='w-full space-y-4'>
      <Skeleton className='h-60 w-full' />
      <Skeleton className='h-60 w-full' />
      <Skeleton className='h-60 w-full' />
    </ul>
  );
};
