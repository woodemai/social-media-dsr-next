'use client';

import dynamic from 'next/dynamic';
import { Link } from 'next-view-transitions';

import { useEffect, useRef } from 'react';

import { MediaList , Social} from '@/entities/post';
import { UserAvatar } from '@/features/user';

import { FullPost } from '@/shared/api/post';

interface PostItemProps {
  post: FullPost;
  isOwner?: boolean;
  isLast?: boolean;
  newLimit: () => void;
}

const DeleteButton = dynamic(() => import('@/entities/post').then(mob => mob.DeleteButton));

export const PostItem = ({ post, isOwner = false, isLast = false, newLimit }: PostItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!itemRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(itemRef.current);
  }, [isLast]);

  return (
    <li className='p-4 space-y-4  max-w-full' ref={itemRef}>
      <div className='flex justify-between w-full prose dark:prose-invert'>
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
