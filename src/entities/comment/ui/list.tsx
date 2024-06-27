import { type Comment } from '@prisma/client';

import { CommentItem } from './item';

type CommentListProps = {
  comments: Comment[];
}

export const CommentList = ({comments}:CommentListProps) => {

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}><CommentItem comment={comment}/></li>
      ))}
    </ul>
  )
};