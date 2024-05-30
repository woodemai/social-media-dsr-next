import { MediaList } from './media-list';

import { Social } from './social';

import { UserAvatar } from '../user/avatar';

import { Link } from 'next-view-transitions';

import { FullPost } from '@/data/post';

interface PostItemProps {
  post: FullPost;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <li className='border p-4 rounded-md space-y-4 prose dark:prose-invert max-w-full'>
      <div className='flex gap-x-4 items-end'>
        <UserAvatar
          height={32}
          src={post.author.image}
          width={32}
        />
        <Link
          className=' underline-offset-4'
          href={`/user/${post.authorId}`}
        >
          <h4 className='text-muted-foreground'>{post.author.name}</h4>
        </Link>
      </div>
      <p>{post.body}</p>
      <MediaList media={post.multimedia} />
      <Social id={post.id} initialIsLiked={post.likedUsers.length > 0} likesCount={post._count.likedUsers} />
    </li>
  );
};
