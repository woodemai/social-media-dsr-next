'use client';

import { useEffect, useRef, useState } from 'react';

import { PostItem } from '@/components/post/item';
import { FullPost, getPosts } from '@/data/post';

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
    getPosts({ userId, page }).then(newPosts =>
      setPosts([...posts, ...newPosts]),
    );
  }, [page]);

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
