'use client';

import { ProfileState } from './profile-info';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { updateProfileAction } from '@/actions/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateSchema } from '@/schemas/user';

interface EditButtonProps {
  id: string;
  state: ProfileState;
  updateState: (action: ProfileState) => void;
  setState: (action: ProfileState) => void;
}

export const EditButton = ({
  id,
  state: { name, bio },
  updateState,
  setState,
}: EditButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: name ?? '',
      bio: bio ?? '',
    },
  });

  const onSubmit = async (values: z.infer<typeof updateSchema>) => {
    startTransition(async () => {
      updateState({
        name: values.name,
        bio: values.bio ?? null,
      });
      const response = await updateProfileAction(id, values);
      if (response) {
        setState({
          name: response.name,
          bio: response.bio ?? null,
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          variant='secondary'
        >
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Обновление профиля</DialogHeader>
        <Form {...form}>
          <form
            className='space-y-4 w-full'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Введите новое имя'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Расскажите немного о себе'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='flex justify-end'>
              <DialogClose asChild>
                <Button
                  className='ml-auto'
                  type='submit'
                >
                  Обновить
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
