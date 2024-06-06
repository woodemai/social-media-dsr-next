'use client';


import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useOptimistic, useState, useTransition } from 'react';

import { likePostAction, unlikePostAction } from '@/shared/actions/post';
import { Button } from '@/shared/ui/button';

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
        <Button
          className='space-x-2 w-full max-w-16 rounded-lg'
          disabled={isPending}
          name='Лайк'
          onClick={handleLike}
          size='icon'
          title='Лайк'
          type='button'
          variant='ghost'
        >
          <span className='sr-only'>{optimisticIsLiked ? 'Лайкнуть' : 'Убрать лайк'}</span>
          {optimisticIsLiked ? (
            <HeartFilledIcon className='size-4 text-red-500' />
          ) : (
            <HeartIcon className='size-4' />
          )}
          <LikesCount count={optimisticLikesCount} />
        </Button>
      </div>
    </div>
  );
};

const LikesCount = ({ count }: { count: number; }) => {
  return <span className='tabular-nums'>{count}</span>;
};
