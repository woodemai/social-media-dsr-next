'use client';

import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';

type CommentButtonProps = {
  commentsCount: number;
  setWriting: () => void;
};

export const CommentButton = ({ setWriting, commentsCount = 0 }: CommentButtonProps) => {
  return (
    <Button
      className='flex w-auto gap-x-2 rounded-full p-2'
      name='Комментарий'
      onClick={() => setWriting()}
      size='icon'
      title='Комментарий'
      type='button'
      variant='secondary'
    >
      <ChatBubbleIcon className='size-6' />
      {commentsCount > 0 && commentsCount}
    </Button>
  );
};
