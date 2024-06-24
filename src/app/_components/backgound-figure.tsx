import Image from 'next/image';

import { cn } from '@/shared/utils';

import backgroundFigureImage from '../../../public/images/background.png';

export const BackgroundFigure = ({ className }: { className: string }) => {
  return (
    <Image
      className={cn('fixed -z-10 blur-3xl dark:brightness-50', className)}
      alt='background'
      src={backgroundFigureImage}
      quality={1}
      placeholder='blur'
    />
  );
};
