'use client';

import { useToast } from '../ui/use-toast';

import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';

import { deleteAction } from '@/actions/post';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
          variant='ghost'
        >
          <span className='sr-only'>Меню поста</span>
          <DotsHorizontalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            className='flex gap-x-4 items-center'
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
