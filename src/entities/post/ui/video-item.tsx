'use client';
import { useEffect, useRef } from 'react';

interface VideoItemProps {
  src: string;
}

export const VideoItem = ({ src }: VideoItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    });

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <video
      className='rounded-sm size-full shadow-md border m-0 object-cover'
      controls
      height={256}
      loop
      muted
      preload='auto'
      ref={videoRef}
      width={256}
    >
      <source src={src} type='video/mp4' />
    </video>
  );
};
