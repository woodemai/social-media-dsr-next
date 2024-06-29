'use client';

import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useOptimistic, useState, useTransition } from 'react';

import { likePostAction, unlikePostAction } from '@/entities/post/actions';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils';

type LikeProps = {
  likesCount: number;
  initialIsLiked?: boolean;
  id: string;
};

export const LikeButton = ({
  id,
  initialIsLiked = false,
  likesCount: initialLikesCount,
}: LikeProps) => {
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
    <Button
      className='flex w-auto gap-x-2 rounded-full p-2'
      disabled={isPending}
      name='Лайк'
      onClick={handleLike}
      size='icon'
      title='Лайк'
      type='button'
      variant='secondary'
    >
      <span className='sr-only'>
        {optimisticIsLiked ? 'Лайкнуть' : 'Убрать лайк'}
      </span>
      <motion.div
        className={cn('', !optimisticIsLiked && 'hidden')}
        animate={
          optimisticIsLiked
            ? { scale: [1, 1.4, 1], opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <HeartFilledIcon className='size-6 font-bold text-red-500' />
      </motion.div>
      <motion.div
        className={cn('', optimisticIsLiked && 'hidden')}
        animate={optimisticIsLiked ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <HeartIcon className='size-6 font-bold' />
      </motion.div>

      {optimisticLikesCount && (
        <span
          className={cn(
            'text-xs tabular-nums',
            optimisticIsLiked && 'font-bold text-foreground',
          )}
        >
          {optimisticLikesCount}
        </span>
      )}
    </Button>
  );
};
