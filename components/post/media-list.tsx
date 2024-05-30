import Image from 'next/image';

interface MediaListProps {
  media: string[];
}

export const MediaList = ({ media }: MediaListProps) => {
  return (
    <div className='flex gap-x-4 size-full'>
      {media.map(item => (
        <div className='size-full' key={item}>
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
            <Image
              alt='Изображение'
              className='size-full rounded-lg'
              height={256}
              src={item}
              width={256}
            />
          )}
        </div>
      ))}
    </div>
  );
};
