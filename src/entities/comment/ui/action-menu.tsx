import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';

import { useStore } from '@/config/store';
import { removeCommentAction } from '@/entities/comment/actions';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useToast } from '@/shared/ui/use-toast';

type ActionsMenuProps = {
  postId: string;
  commentId: string;
};

export const ActionsMenu = ({ postId, commentId }: ActionsMenuProps) => {
  const [isPending, startTransition] = useTransition();
  const { removeComment } = useStore(state => state.postSlice);
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      await removeCommentAction(commentId);
      removeComment(postId, commentId);
      toast({
        title: 'Комментарий удален!',
        variant: 'success',
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          name='Меню комментария'
          size='icon'
          title='Меню комментария'
          variant='ghost'
        >
          <span className='sr-only'>Меню комментария</span>
          <DotsHorizontalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button
          disabled={isPending}
          onClick={handleDelete}
          variant='ghost'
        >
          <TrashIcon className='size-4' />
          <span>Удалить</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
