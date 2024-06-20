'use client';

import { useEffect, useRef, useState } from 'react';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { useStore } from '@/config/store';
import { type FullPost, getPosts } from '@/entities/post';
import { PostItem } from '@/features/post';

type ListClientProps = {
  userId?: string;
  posts: FullPost[];
  currentUserId?: string;
};

export const ListClient = ({
  posts: initialPosts,
  userId,
  currentUserId,
}: ListClientProps) => {
  const endRef = useRef<HTMLLIElement>(null);
  const { posts, addPosts, resetPosts } = useStore(state => state.postSlice);
  const [page, setPage] = useState(1);

  useEffect(() => {
    addPosts(initialPosts);
    return () => {
      resetPosts();
    };
  }, [addPosts, initialPosts, resetPosts]);

  useEffect(() => {
    if (page === 1 || posts.length % PAGE_SIZE !== 0) return;
    void getPosts({ userId, page }).then(newPosts => {
      addPosts(newPosts);
    });
  }, [addPosts, page, posts.length, userId]);

  return (
    <ul className='space-y-4'>
      {posts.map((post, index) => (
        <PostItem
          isLast={index === posts.length - 1}
          isOwner={currentUserId ? post.authorId === currentUserId : false}
          key={post.id}
          newLimit={() => {
            setPage(page + 1);
          }}
          post={post}
        />
      ))}
      <li ref={endRef} />
    </ul>
  );
};
