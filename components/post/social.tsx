'use client';

import { Button } from '../ui/button';

import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

import { useOptimistic, useState, useTransition } from 'react';

import { likePostAction, unlikePostAction } from '@/actions/post';

interface SocialProps {
  likesCount: number;
  initialIsLiked?: boolean;
  id: string;
}

export const Social = ({
  id,
  likesCount: initialLikesCount,
  initialIsLiked = true,
}: SocialProps) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();
  const [optimisticIsLiked, toggleIsLiked] = useOptimistic<boolean, void>(
    isLiked,
    isLiked => !isLiked,
  );
  const [optimisticLikesCount, handleLikesCount] = useOptimistic<number, void>(
    likesCount,
    likesCount => (isLiked ? likesCount - 1 : likesCount + 1),
  );

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(async () => {
      toggleIsLiked();
      handleLikesCount();
      let response;
      if (isLiked) {
        response = await unlikePostAction(id);
      } else {
        response = await likePostAction(id);
      }
      if (!isPending) {
        setIsLiked(response.likedUsers.length > 0);
        setLikesCount(response._count.likedUsers);
      }
    });
  };

  return (
    <div>
      <div className='flex items-center'>
        <LikesCount count={optimisticLikesCount} />
        <Button
          className='rounded-full'
          disabled={isPending}
          onClick={handleLike}
          size='icon'
          type='button'
          variant='ghost'
        >
          {optimisticIsLiked ? (
            <HeartFilledIcon className='size-4 text-red-500' />
          ) : (
            <HeartIcon className='size-4' />
          )}
        </Button>
      </div>
    </div>
  );
};

const LikesCount = ({ count }: { count: number }) => {
  return <span className='tabular-nums'>{count}</span>;
};
