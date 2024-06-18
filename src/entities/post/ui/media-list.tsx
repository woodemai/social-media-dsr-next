import Image from 'next/image';

import { cn } from '@/config/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';

import { VideoItem } from './video-item';

interface MediaListProps {
  media: string[];
}

export const MediaList = ({ media }: MediaListProps) => {
  return (
    <div
      className={cn(
        'grid gap-1 size-full',
        media.length < 2
          ? 'grid-cols-1'
          : media.length % 2 === 0
            ? 'grid-cols-2'
            : 'grid-cols-2',
      )}>
      {media.map(item => (
        <div
          className='mx-auto size-fit p-0 m-0 '
          key={item}>
          {item.includes('/video/') ? (
            <VideoItem src={item} />
          ) : (
            <Dialog>
              <DialogTrigger className='p-0 m-0 size-fit h-full'>
                <Image
                  alt='Изображение'
                  className='m-0 rounded-sm size-full object-cover'
                  height={1024}
                  priority
                  src={item}
                  width={1024}
                />
              </DialogTrigger>
              <DialogContent className='size-full bg-transparent border-0 grid max-w-fit shadow-none h-fit place-content-center'>
                <Image
                  alt='Изображение'
                  className='rounded-sm'
                  height={1024}
                  src={item}
                  width={1024}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}
    </div>
  );
};
