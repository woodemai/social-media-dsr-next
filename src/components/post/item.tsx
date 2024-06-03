import { MediaList } from './media-list';

import { Social } from './social';

import { UserAvatar } from '../user/avatar';

import dynamic from 'next/dynamic';
import { Link } from 'next-view-transitions';

import { FullPost } from '@/src/data/post';

interface PostItemProps {
  post: FullPost;
  isOwner?: boolean;
}

const DeleteButton = dynamic(() => import('./delete-button').then(mob => mob.DeleteButton));

export const PostItem = ({ post, isOwner = false }: PostItemProps) => {
  return (
    <li className='border p-4 rounded-md space-y-4 prose dark:prose-invert max-w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-x-4 items-end'>
          <UserAvatar
            height={32}
            src={post.author.image}
            width={32}
          />
          {isOwner ? (
            <h5 className='text-muted-foreground font-semibold'>{post.author.name}</h5>
          ) : (
            <Link
              className=' underline-offset-4'
              href={`/user/${post.authorId}`}
            >
              <h4 className='text-muted-foreground'>{post.author.name}</h4>
            </Link>
          )}
        </div>
        {isOwner ? <DeleteButton id={post.id} /> : null}

      </div>
      <p>{post.body}</p>
      <MediaList media={post.multimedia} />
      <Social
        id={post.id}
        initialIsLiked={post.likedUsers.length > 0}
        likesCount={post._count.likedUsers}
      />
    </li>
  );
};
