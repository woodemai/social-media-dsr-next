'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';

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
  const lastRef = useRef<HTMLLIElement>(null);
  const { posts, addPosts, resetPosts } = useStore(state => state.postSlice);
  const [isPending, startTransition] = useTransition();
  const [noPosts, setNoPosts] = useState(false);
  const page = useRef(1);

  useEffect(() => {
    addPosts(initialPosts);
    return () => {
      resetPosts();
    };
  }, [addPosts, initialPosts, resetPosts]);

  useEffect(() => {
    if (!lastRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startTransition(async () => {
          const newPosts = await getPosts({ userId, page: page.current + 1 });

          if (newPosts.length === 0) {
            setNoPosts(true);
            observer.unobserve(entry.target);
            return;
          }
          addPosts(newPosts);
          page.current += 1;
        });
      }
    });

    observer.observe(lastRef.current);
  }, [addPosts, page, userId]);

  return (
    <ul className='space-y-4'>
      {posts.map(post => (
        <PostItem
          isOwner={currentUserId ? post.authorId === currentUserId : false}
          key={post.id}
          post={post}
        />
      ))}
      {noPosts && (
        <div className='flex w-full items-center justify-center p-8'>
          <h2 className='mx-auto text-xl text-muted-foreground'>
            Вы долистали до конца!
          </h2>
        </div>
      )}
      {isPending && <Loader2 className='mx-auto animate-spin' />}
      <li ref={lastRef} />
    </ul>
  );
};
