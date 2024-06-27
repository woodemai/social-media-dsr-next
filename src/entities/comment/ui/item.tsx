import { type Comment } from '@prisma/client';

type CommentItemProps = {
  comment: Comment;
}

export const CommentItem = ({ comment }:CommentItemProps) => {
  return (
    <div>
      {comment.body}
    </div>
  )
 };