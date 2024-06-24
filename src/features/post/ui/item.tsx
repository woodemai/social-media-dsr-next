'use client';

import dynamic from 'next/dynamic';
import { Link } from 'next-view-transitions';

import { type FullPost, MediaList, Social } from '@/entities/post';
import { UserAvatar } from '@/features/user';

type PostItemProps = {
  post: FullPost;
  isOwner?: boolean;
};

const ActionsMenu = dynamic(() =>
  import('@/entities/post').then(mob => mob.ActionsMenu),
);

export const PostItem = ({ post, isOwner = false }: PostItemProps) => {
  return (
    <li className='max-w-full space-y-4 rounded-md bg-card/50 p-4'>
      <div className='flex w-full justify-between'>
        <div className='flex items-end gap-x-4'>
          <UserAvatar
            height={32}
            src={post.author.image}
            width={32}
          />
          {isOwner ? (
            <h5 className='font-semibold text-muted-foreground'>
              {post.author.name}
            </h5>
          ) : (
            <Link
              className='underline-offset-4'
              href={`/user/${post.authorId}`}
            >
              <h4 className='text-muted-foreground'>{post.author.name}</h4>
            </Link>
          )}
        </div>
        {isOwner ? <ActionsMenu id={post.id} /> : null}
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
