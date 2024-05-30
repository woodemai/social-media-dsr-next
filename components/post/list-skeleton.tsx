import { Skeleton } from '../ui/skeleton';

export const ListSkeleton = () => {
  return (
    <ul className='w-full space-y-4'>
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
      <Skeleton className='w-full h-44' />
    </ul>
  );
};