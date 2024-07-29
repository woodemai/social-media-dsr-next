'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

const ImageItem = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <div className='relative'>
      <Image
        className='rounded-md'
        priority
        src={url}
        alt='Image'
        width={512}
        height={512}
      />
      <Button
        className='absolute right-4 top-0'
        variant='ghost'
        size='icon'
        onClick={() => router.back()}
      >
        <Cross1Icon className='size-4' />
      </Button>
    </div>
  );
};

export default ImageItem;
