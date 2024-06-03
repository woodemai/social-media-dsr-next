import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import Image from 'next/image';

import { cn } from '@/src/lib/utils';

interface MediaListProps {
  media: string[];
}

export const MediaList = ({ media }: MediaListProps) => {
  return (
    <div className={cn('grid gap-4 size-full', media.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
      {media.map(item => (
        <div className='mx-auto' key={item}>
          {item.includes('/video/') ? (
            <video
              className='rounded-lg size-full'
              controls
              height={256}
              muted
              preload='none'
              width={256}
            >
              <source
                src={item}
                type='video/mp4'
              />
            </video>
          ) : (
            <Dialog>
              <DialogTrigger className='p-0'>
                <Image
                  alt='Изображение'
                  className='m-0 rounded-lg size-auto'
                  height={512}
                  priority
                  src={item}
                  width={512}
                />
              </DialogTrigger>
              <DialogContent className='overflow-hidden object-contain w-full sm:w-fit h-fit max-h-[90%] p-0'>
                <Image
                  alt='Изображение'
                  className='rounded-lg'
                  height={2048}
                  src={item}
                  width={2048}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}
    </div>
  );
};
