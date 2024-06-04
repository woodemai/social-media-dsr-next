import { ListSkeleton } from '@/components/post/list-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <div className='space-y-8 mx-auto w-full max-w-3xl'>
      <div className='flex gap-x-4'>
        <Skeleton className='rounded-full size-32' />
        <div className='flex flex-col gap-y-4'>
          <div className='flex gap-x-4'>
            <Skeleton className='h-10 w-44' />
            <Skeleton className='h-10 w-24' />
          </div>
          <Skeleton className='h-4 w-48' />
          <div className='flex gap-x-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
      </div>
      <ListSkeleton />
    </div>
  );
}
