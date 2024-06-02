'use client';

import { ProfileState } from './profile-info';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { updateProfileAction } from '@/actions/user';
import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import { useToast } from '@/components/ui/use-toast';
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
  const [error, setError] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: name ?? '',
      bio: bio ?? '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof updateSchema>) => {
    setError(undefined);
    updateState({
      name: values.name,
      bio: values.bio ?? null,
    });
    startTransition(async () => {
      const response = await updateProfileAction(id, values);
      setError(response.error);
      if (response?.name && response?.bio) {
        setOpen(false);
        setState({
          name: response.name,
          bio: response.bio ?? null,
        });
        toast({
          title: 'Успех',
          description: 'Данные сохранены'
        });
      }
    });
  };

  return (
    <Dialog onOpenChange={isOpen => setOpen(isOpen)} open={open}>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Придумайте надежный пароль'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <DialogFooter className='flex justify-end'>
              <Button
                className='ml-auto'
                type='submit'
              >
                Обновить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
