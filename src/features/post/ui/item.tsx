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
    <li className='max-w-full space-y-4 rounded-md bg-card/50 p-4'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <UserAvatar src={post.author.image} />
          <Button
            className='text-muted-foreground text-lg'
            asChild
            variant='link'
          >
            <Link href={`/user/${post.authorId}`}>{post.author.name}</Link>
          </Button>
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
