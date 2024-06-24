import { PersonIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { cn } from '@/shared/utils';
type UserAvatarProps = {
  src?: string | null;
  width?: number;
  height?: number;
  alt?: string,
  size?: 'lg' | 'md' | 'sm';
};

export const UserAvatar = ({
  src,
  width = 32,
  height = 32,
  size = 'sm',
  alt = 'User avatar'
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        size === 'sm' && 'size-8',
        size === 'md' && 'size-16',
        size === 'lg' && 'size-32',
      )}
    >
      {src ? (
        <AvatarImage
          alt={alt}
          className='m-0'
          height={height}
          src={src}
          width={width}
        />
      ) : undefined}
      <AvatarFallback>
        <PersonIcon />
      </AvatarFallback>
    </Avatar>
  );
};
