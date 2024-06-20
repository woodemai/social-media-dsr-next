'use client';

import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useToast } from '@/shared/ui/use-toast';
import { useStore } from '@/config/store';
import { deleteAction } from '../actions';

interface DeleteButtonProps {
  id: string;
}

export const ActionsMenu = ({ id }: DeleteButtonProps) => {
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
      <DropdownMenuTrigger asChild>
        <Button
          name='Меню поста'
          size='icon'
          title='Меню поста'
          variant='ghost'>
          <span className='sr-only'>Меню поста</span>
          <DotsHorizontalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            className='flex gap-x-4 items-center'
            // onClick={handleDelete}
            type='button'>
            <Pencil1Icon className='size-4' />
            <span>Редактировать</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className='flex gap-x-4 items-center'
            onClick={handleDelete}
            type='button'>
            <TrashIcon className='size-4' />
            <span>Удалить</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
