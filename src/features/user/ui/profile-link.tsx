import { Link } from 'next-view-transitions';

import { cn } from '@/shared/utils';

import { UserAvatar } from './avatar';

type ProfileLinkProps = {
  userId: string;
  userName: string | null;
  imageUrl?: string | null;
};

export const ProfileLink = ({
  userId,
  imageUrl,
  userName,
}: ProfileLinkProps) => {
  if (!userName) return null;

  return (
    <Link
      href={`/user/${userId}`}
      className={cn(
        'flex items-center gap-x-2 font-bold underline-offset-4 transition-all duration-200 hover:text-foreground/70 hover:underline',
      )}
    >
      <UserAvatar src={imageUrl} />
      <span>{userName}</span>
    </Link>
  );
};
