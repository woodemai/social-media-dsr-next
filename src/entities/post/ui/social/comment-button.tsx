'use client';

import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';

type CommentButtonProps = {
  setWriting: () => void;
}

export const CommentButton = ({setWriting}:CommentButtonProps) => {

  return (
    <Button
      className='w-full max-w-16 space-x-2 rounded-lg'
      name='Комментарий'
      onClick={() => setWriting()}
      size='icon'
      title='Комментарий'
      type='button'
      variant='ghost'>
      <ChatBubbleIcon className='size-4' />
    </Button>
  )
};