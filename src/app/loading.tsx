import { Loader2 } from 'lucide-react';

const RootLoading = () => {
  return (
    <div className='grid h-dvh place-content-center'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  );
};

export default RootLoading;
