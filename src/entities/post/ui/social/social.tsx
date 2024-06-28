'use client';
import { useState } from 'react';

import { type FullComment } from '@/entities/comment/types';
import { CommentList } from '@/entities/comment/ui/list';

import { CommentButton } from './comment-button';
import { CommentForm } from './comment-form';
import { LikeButton } from './like-button';

type SocialProps = {
  likesCount: number;
  initialIsLiked?: boolean;
  id: string;
  comments: FullComment[];
};

export const Social = ({
  id,
  likesCount: initialLikesCount,
  initialIsLiked = true,
  comments,
}: SocialProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-x-4'>
        <LikeButton
          id={id}
          initialIsLiked={initialIsLiked}
          likesCount={initialLikesCount}
        />
        <CommentButton
          commentsCount={comments.length}
          setWriting={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen ? (
        <>
          <CommentList
            postId={id}
            comments={comments}
          />
          <CommentForm postId={id} />
        </>
      ) : (
        comments[0] && (
          <CommentList
            postId={id}
            comments={[comments[0]]}
          />
        )
      )}
    </div>
  );
};
