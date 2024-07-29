'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useStore } from '@/config/store';
import { commentUpdateAction } from '@/entities/comment/actions';
import {
  commentSchema,
  type commentSchemaType,
} from '@/entities/comment/schemas';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

type CommentEditFormProps = {
  stopEditing: () => void;
  defaultValues: Partial<commentSchemaType>;
  commentId: string;
  postId: string;
};

export const CommentEditForm = ({
  stopEditing,
  defaultValues,
  commentId,
  postId,
}: CommentEditFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { updateComment } = useStore(state => state.postSlice);

  const form = useForm<commentSchemaType>({
    disabled: isPending,
    resolver: zodResolver(commentSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((values: commentSchemaType) => {
    startTransition(async () => {
      const updatedComment = await commentUpdateAction(values, commentId);
      stopEditing();
      updateComment(postId, commentId, updatedComment);
    });
  });

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-y-4'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center gap-x-4'>
          <Pencil1Icon className='size-4' />
          <h3 className='text-lg font-bold tracking-tight'>Редактирование</h3>
        </div>
        <FormField
          name='body'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Комментарий...'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-x-4'>
          <Button
            onClick={stopEditing}
            variant='secondary'
          >
            Отмена
          </Button>
          <Button type='submit'>Сохранить</Button>
        </div>
      </form>
    </Form>
  );
};
