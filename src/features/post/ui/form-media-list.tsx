import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { VideoItem } from '@/entities/post';
import { Button } from '@/shared/ui/button';

type FormMediaListProps = {
  media: string[];
  onRemove: (url: string) => void;
};

export const FormMediaList = ({ media, onRemove }: FormMediaListProps) => {
  if (!media.length) return null;

  return (
    <div className='relative flex items-center gap-x-4'>
      {media.map(item => (
        <div
          className='p-2'
          key={item}
        >
          <Button
            variant='ghost'
            className='absolute right-2 top-2 z-10'
            onClick={() => onRemove(item)}
          >
            <Cross1Icon className='size-4' />
          </Button>
          {item.includes('/video/') ? (
            <VideoItem src={item} />
          ) : (
            <Image
              alt='Загруженное изображение'
              className='rounded-md'
              height={128}
              src={item}
              width={128}
            />
          )}
        </div>
      ))}
    </div>
  );
};
