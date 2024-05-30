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
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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
      multimedia: [],
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

  const handleMediaUpload = (results: CloudinaryUploadWidgetResults) => {
    if (typeof results.info !== 'string' && results.info?.secure_url) {
      form.setValue('multimedia', [
        ...form.getValues('multimedia'),
        results.info.secure_url,
      ]);
    }
  };

  const uploadedMedia = useWatch({
    control: form.control,
    name: 'multimedia',
  });

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-y-4 border rounded-md'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex gap-x-2 p-4'>
          <FormField
            control={form.control}
            name='multimedia'
            render={() => (
              <FormItem>
                <FormControl>
                  <CldUploadWidget
                    onSuccess={handleMediaUpload}
                    uploadPreset='fkkcjhmy'
                  >
                    {({ open }) => (
                      <Button
                        onClick={() => open()}
                        size='icon'
                        type='button'
                        variant='ghost'
                      >
                        <UploadIcon className='size-4' />
                      </Button>
                    )}
                  </CldUploadWidget>
                </FormControl>
              </FormItem>
            )}
          />
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
        <div className='flex gap-x-4 items-center'>
          {uploadedMedia.map(media => (
            <div className='p-2' key={media}>
              {media.includes('/video/') ? (
                <video
                  className='rounded-md'
                  controls
                  height={256}
                  muted
                  preload='none'
                  width={256}
                >
                  <source
                    src={media}
                    type='video/mp4'
                  />
                </video>
              ) : (
                <Image
                  alt='Загруженное изображение'
                  className='rounded-md'
                  height={128}
                  src={media}
                  width={128}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
};
