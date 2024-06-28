import { Link } from 'next-view-transitions';

import { type FullComment } from '@/entities/comment/types';
import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';
import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';

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
  //TODO: Add edit options
  return (
    <div className='flex items-start justify-between gap-x-2 overflow-hidden'>
      <div className='flex gap-x-2 overflow-hidden'>
        <UserAvatar src={author.image} />
        <div className='flex flex-col gap-x-2 overflow-hidden'>
          <Button
            asChild
            variant='link'
            className='justify-start items-center text-muted-foreground p-1'
          >
            <Link href={`/user/${author.id}`}>{author.name}</Link>
          </Button>
          <div className='break-words'>{body}</div>
        </div>
      </div>
      {user?.id === author.id &&(
      <ActionsMenu
        postId={postId}
        commentId={id}
        />
      )}
    </div>
  );
};
