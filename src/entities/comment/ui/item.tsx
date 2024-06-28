import { type FullComment } from '@/entities/comment/types';
import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';
import { ProfileLink } from '@/features/user/ui/profile-link';

import { ActionsMenu } from './action-menu';

type CommentItemProps = {
  postId: string;
  comment: FullComment;
};

export const CommentItem = ({
  comment: { author, body, id },
  postId,
}: CommentItemProps) => {
  const user = useCurrentUser();
  const isOwner = user?.id === author.id;
  //TODO: Add edit options
  return (
    <div className='group/comment flex items-start justify-between gap-x-2 overflow-hidden'>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <ProfileLink
          userId={author.id}
          userName={author.name}
          imageUrl={author.image}
        />
        <div className='ml-8 break-words'>{body}</div>
      </div>
      {isOwner && (
        <ActionsMenu
          postId={postId}
          commentId={id}
        />
      )}
    </div>
  );
};
