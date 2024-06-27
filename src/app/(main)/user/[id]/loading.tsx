import { Skeleton } from '@/shared/ui/skeleton';
import { ListSkeleton } from '@/widgets/post';

const ProfileLoading = () => {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-8'>
      <div className='flex gap-x-4'>
        <Skeleton className='size-32 rounded-full' />
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
};

export default ProfileLoading;
