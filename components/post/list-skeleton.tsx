import { Skeleton } from '../ui/skeleton';

export const ListSkeleton = () => {
  return (
    <ul className='w-full space-y-4'>
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
      <Skeleton className='w-full h-28' />
    </ul>
  );
};