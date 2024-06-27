import { Skeleton } from '@/shared/ui/skeleton';
import { ListSkeleton } from '@/widgets/post';

const MainLoading = () => {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-4 py-8'>
      <Skeleton className='h-20 w-full' />
      <ListSkeleton />
    </div>
  );
};
export default MainLoading;
