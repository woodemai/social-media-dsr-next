import { type FullComment } from '@/entities/comment/types';

import { CommentItem } from './item';

type CommentListProps = {
  comments: FullComment[];
};

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <ul className='space-y-4'>
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};
