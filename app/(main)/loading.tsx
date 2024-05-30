import { Skeleton } from '@/components/ui/skeleton';

export default function MainLoading() {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-4 py-8'>
      <Skeleton className='w-full h-20' />
      <Skeleton className='w-full h-32' />
      <Skeleton className='w-full h-32' />
      <Skeleton className='w-full h-32' />
      <Skeleton className='w-full h-32' />
      <Skeleton className='w-full h-32' />
      <Skeleton className='w-full h-32' />
    </div>
  );
}