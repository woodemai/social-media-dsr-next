'use client';

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { type FullPost, MediaList, Social } from '@/entities/post';
import { ProfileLink } from '@/features/user/ui/profile-link';

import { PostEditForm } from './edit-form';

type PostItemProps = {
  post: FullPost;
  isOwner?: boolean;
};

const ActionsMenu = dynamic(() =>
  import('@/entities/post').then(mob => mob.ActionsMenu),
);

export const PostItem = ({ post, isOwner = false }: PostItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AnimatePresence>
      <motion.li
        initial={{ opacity: 0, scale: 0.8 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        animate={{ opacity: 1, scale: 1 }}
        className='group/post flex max-w-full flex-col gap-y-4 rounded-md bg-card/50 p-4'
      >
        {isEditing ? (
          <PostEditForm
            id={post.id}
            close={() => setIsEditing(false)}
            defaultValues={post}
          />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              animate={{ opacity: 1 }}
              className='relative flex w-full items-center justify-between'
            >
              <div className='flex items-center gap-x-2'>
                <ProfileLink
                  imageUrl={post.author.image}
                  userName={post.author.name}
                  userId={post.authorId}
                />
              </div>
              {isOwner && (
                <ActionsMenu
                  startEditing={() => setIsEditing(true)}
                  id={post.id}
                />
              )}
            </motion.div>
            <p>{post.body}</p>

            <MediaList media={post.multimedia} />
            <Social
              comments={post.comments}
              id={post.id}
              initialIsLiked={post.likedUsers.length > 0}
              likesCount={post._count.likedUsers}
            />
          </>
        )}
      </motion.li>
    </AnimatePresence>
  );
};
