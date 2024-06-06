'use client';

import { useEffect, useRef, useState } from 'react';

import { PAGE_SIZE } from '@/config/next.constants.mjs';
import { PostItem } from '@/features/post';
import { FullPost, getPosts } from '@/shared/api/post';

interface ListClientProps {
  userId?: string;
  posts: FullPost[];
  isOwner?: boolean;
}

export const ListClient = ({
  posts: initialPosts,
  isOwner = false,
  userId,
}: ListClientProps) => {
  const endRef = useRef<HTMLLIElement>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1 || posts.length % PAGE_SIZE !== 0) return;
    getPosts({ userId, page }).then(newPosts =>
      setPosts(prev => [...prev, ...newPosts]),
    );
  }, [page, posts.length, userId]);

  return (
    <ul className='divide-y border-x px-2 bg-card rounded-md'>
      {posts.map((post, index) => (
        <PostItem
          isLast={index === posts.length - 1}
          isOwner={isOwner}
          key={post.id}
          newLimit={() => setPage(page + 1)}
          post={post}
        />
      ))}
      <li ref={endRef} />
    </ul>
  );
};
