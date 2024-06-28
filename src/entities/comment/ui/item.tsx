import { type FullComment } from '@/entities/comment/types';
import { UserAvatar } from '@/features/user';

import { ActionsMenu } from './action-menu';

type CommentItemProps = {
  postId: string;
  comment: FullComment;
};

export const CommentItem = ({ comment, postId }: CommentItemProps) => {
  //TODO: Add edit options
  return (
    <div className='flex items-start justify-between gap-x-2 overflow-hidden'>
      <div className='flex gap-x-2 overflow-hidden'>
        <UserAvatar src={comment.author.image} />
        <div className='flex flex-col gap-x-2 overflow-hidden'>
          <h4 className='break-words text-muted-foreground'>
            {comment.author.name}
          </h4>
          <div>{comment.body}</div>
        </div>
      </div>
      <ActionsMenu
        postId={postId}
        commentId={comment.id}
      />
    </div>
  );
};
