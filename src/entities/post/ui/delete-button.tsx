'use client';

import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';

import { deleteAction } from '@/shared/actions/post';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useToast } from '@/shared/ui/use-toast';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteAction(id).then(res => {
      if (res) {
        toast({
          title: 'Успех',
          description: 'Пост успешно удален!',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить пост!',
          variant: 'destructive',
        });
      }
    });
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
