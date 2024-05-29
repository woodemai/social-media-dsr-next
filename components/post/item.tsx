import { UserAvatar } from '../user/avatar';

import { FullPost } from '@/data/post';

interface PostItemProps {
  post: FullPost;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <li className='border p-4 rounded-md space-y-4 prose dark:prose-invert max-w-full'>
      <div className='flex gap-x-4 items-end'>
        <UserAvatar height={32} src={post.author.image} width={32} />
        <h4 className='text-muted-foreground'>{post.author.name}</h4>
      </div>
      <p>{post.body}</p>
    </li>
  );
};
