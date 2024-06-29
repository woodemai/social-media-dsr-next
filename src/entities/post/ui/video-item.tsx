'use client';

import ReactPlayer from 'react-player/lazy';

type VideoItemProps = {
  src: string;
};

export const VideoItem = ({ src }: VideoItemProps) => {
  return (
    <div className='overflow-hidden rounded-md'>
      <ReactPlayer
        playing
        loop
        volume={1}
        width='auto'
        height={'auto'}
        muted
        controls
        url={src}
      />
    </div>
  );
};
