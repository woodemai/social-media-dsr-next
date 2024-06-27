'use client';

import dynamic from 'next/dynamic';
import { Link } from 'next-view-transitions';

import { type FullPost, MediaList, Social } from '@/entities/post';
import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';

type PostItemProps = {
  post: FullPost;
  isOwner?: boolean;
};

const ActionsMenu = dynamic(() =>
  import('@/entities/post').then(mob => mob.ActionsMenu),
);

export const PostItem = ({ post, isOwner = false }: PostItemProps) => {
  return (
    <li className='flex max-w-full flex-col gap-y-4 rounded-md bg-card/50 p-4'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <Button
            className='p-1 text-lg text-muted-foreground'
            asChild
            variant='link'
          >
            <Link
              href={`/user/${post.authorId}`}
              className='space-x-2'
            >
              <UserAvatar src={post.author.image} />
              <span>{post.author.name}</span>
            </Link>
          </Button>
        </div>
        {isOwner ? <ActionsMenu id={post.id} /> : null}
      </div>
      <p>{post.body}</p>
      <MediaList media={post.multimedia} />
      <Social
        comments={post.comments}
        id={post.id}
        initialIsLiked={post.likedUsers.length > 0}
        likesCount={post._count.likedUsers}
      />
    </li>
  );
};
