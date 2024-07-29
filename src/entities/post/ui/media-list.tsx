import Image from 'next/image';
import { Link } from 'next-view-transitions';

import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { cn } from '@/shared/utils';

import { VideoItem } from './video-item';

type MediaListProps = {
  media: string[];
};

export const MediaList = ({ media }: MediaListProps) => {
  return (
    <div
      className={cn(
        'grid size-full gap-1',
        media.length < 2
          ? 'grid-cols-1'
          : media.length % 2 === 0
            ? 'grid-cols-2'
            : 'grid-cols-2',
      )}
    >
      {media.map(item => (
        <div
          className='m-0 mx-auto size-fit p-0 '
          key={item}
        >
          {item.includes('/video/') ? (
            <VideoItem src={item} />
          ) : (
            <Link href={`/image/?url=${item}`}>
              <Image
                alt='Изображение'
                className='m-0 size-full rounded-md object-cover'
                height={1024}
                src={item}
                width={1024}
              />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
