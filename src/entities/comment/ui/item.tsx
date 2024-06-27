import { type FullComment } from '@/entities/comment/types';
import { UserAvatar } from '@/features/user';


type CommentItemProps = {
  comment: FullComment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  //TODO: Add command menu with edit and delete options
  return (
    <div className='flex gap-x-2 overflow-hidden'>
      <UserAvatar src={comment.author.image} />
      <div className='flex flex-col gap-x-2'>
        <h4 className='text-muted-foreground break-words'>{comment.author.name}</h4>
        <div>{comment.body}</div>
      </div>
    </div>
  )
 };