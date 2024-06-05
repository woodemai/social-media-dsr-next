'use client';

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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { updateUser, useUser } from '@/config/store/slices/user-slice';
import { useAppDispatch } from '@/config/store/store';
import { updateSchema } from '@/schemas/user';

export const UpdateDialog = () => {
  const dispatch = useAppDispatch();
  const { id, name, bio, isPrivate } = useUser();
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
      isPrivate: isPrivate ?? false,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateSchema>) => {
    setError(undefined);
    dispatch(updateUser(values));
    startTransition(async () => {
      const { error, name, bio, isPrivate } = await updateProfileAction(id, values);
      setError(error);
      if (name && bio && isPrivate) {
        setOpen(false);
        dispatch(updateUser({ name, bio, isPrivate }));
        toast({
          title: 'Успех',
          description: 'Данные сохранены',
        });
      }
    });
  };

  return (
    <Dialog
      onOpenChange={isOpen => setOpen(isOpen)}
      open={open}
    >
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
            <FormField
              control={form.control}
              name='isPrivate'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormLabel className='pt-1'>Приватный профиль</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
                disabled={isPending}
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
