'use client';

import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';

type CommentButtonProps = {
  setWriting: () => void;
};

export const CommentButton = ({ setWriting }: CommentButtonProps) => {
  return (
    <Button
      className='rounded-full'
      name='Комментарий'
      onClick={() => setWriting()}
      size='icon'
      title='Комментарий'
      type='button'
      variant='secondary'
    >
      <ChatBubbleIcon className='size-4' />
    </Button>
  );
};
