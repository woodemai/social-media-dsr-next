import { PersonIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface UserAvatarProps {
  src?: string | null;
  width?: number;
  height?: number;
}

export const UserAvatar = ({
  src,
  width = 32,
  height = 32,
}: UserAvatarProps) => {
  return (
    <Avatar>
      {src ? (
        <AvatarImage
          alt='User avatar'
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