'use client';
import { type Comment } from '@prisma/client';
import { useState } from 'react';

import { CommentList } from '@/entities/comment/ui/list';

import { CommentButton } from './comment-button';
import { CommentForm } from './comment-form';
import { LikeButton } from './like-button';

type SocialProps = {
  likesCount: number;
  initialIsLiked?: boolean;
  id: string;
  comments: Comment[]
};

export const Social = ({
  id,
  likesCount: initialLikesCount,
  initialIsLiked = true,
  comments
}: SocialProps) => {
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <LikeButton
          id={id}
          initialIsLiked={initialIsLiked}
          likesCount={initialLikesCount}
        />
        <CommentButton setWriting={() => setIsWriting(!isWriting)} />
      </div>
      {isWriting &&
        <>
          <CommentForm />
          <CommentList comments={comments}/>
        </>}
    </div>
  );
};
