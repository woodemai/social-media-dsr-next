'use client';

import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { useStore } from '@/config/store';
import { deleteAction } from '@/entities/post/actions';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useToast } from '@/shared/ui/use-toast';

type DeleteButtonProps = {
  id: string;
  startEditing: () => void;
};

export const ActionsMenu = ({ id, startEditing }: DeleteButtonProps) => {
  const { toast } = useToast();
  const removePost = useStore(state => state.postSlice.removePost);

  const handleDelete = async () => {
    await deleteAction(id);
    toast({
      title: 'Успех',
      description: 'Пост успешно удален!',
    });
    removePost(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='opacity-0 group-hover/post:opacity-100'
      >
        <Button
          name='Меню поста'
          size='icon'
          title='Меню поста'
          variant='ghost'
        >
          <span className='sr-only'>Меню поста</span>
          <DotsHorizontalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            className='flex items-center gap-x-4'
            onClick={startEditing}
            type='button'
          >
            <Pencil1Icon className='size-4' />
            <span>Редактировать</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className='flex items-center gap-x-4'
            onClick={handleDelete}
            type='button'
          >
            <TrashIcon className='size-4' />
            <span>Удалить</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
