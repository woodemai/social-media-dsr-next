'use client';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { createPostAction } from '@/actions/post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSchema } from '@/schemas/form';

export const PostForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      body: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof createSchema>) => {
    await createPostAction(values).then(res => {
      if (res.error) {
        setError(res.error);
        setSuccess('');
      }
      if (res.success) {
        setSuccess(res.success);
        setError('');
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-y-4 border rounded-md'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex gap-x-2 p-4'>
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    {...field}
                    className='w-full border-none hover:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Напишите, что у вас нового...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant='ghost'
          >
            Отправить
          </Button>
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
      </form>
    </Form>
  );
};
