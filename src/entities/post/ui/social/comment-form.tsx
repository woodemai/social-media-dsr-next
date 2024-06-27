'use client';

import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';
import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export const CommentForm = () => {

  const user = useCurrentUser();



  return (
    <div className='container rounded-md p-2 flex gap-x-4 items-center'>
      <UserAvatar src={user?.image} />
      <Input placeholder='Комментарий...' className='bg-transparent' />
      <Button
        variant='ghost'
        size='icon'
      className='p-2 rounded-full'
    >
      <PaperPlaneIcon className='size-4' />
      </Button>
    </div>
  )
};