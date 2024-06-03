import { Loader2 } from 'lucide-react';

export default function RootLoading() {
  return (
    <div className='h-dvh grid place-content-center'>
      <Loader2 className='animate-spin size-10' />
    </div>
  );
}
