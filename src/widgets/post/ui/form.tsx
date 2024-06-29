'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon, UploadIcon } from '@radix-ui/react-icons';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useStore } from '@/config/store';
import { createPostAction } from '@/entities/post';
import { postSchema, type postSchemaType } from '@/entities/post/schemas';
import { FormMediaList } from '@/features/post/ui/form-media-list';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { FormError } from '@/shared/ui/form-error';
import { FormSuccess } from '@/shared/ui/form-success';
import { Input } from '@/shared/ui/input';

export const PostForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const addPost = useStore(state => state.postSlice.addPost);
  const form = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      body: '',
      multimedia: [],
    },
  });

  const onSubmit = async (values: postSchemaType) => {
    await createPostAction(values).then(res => {
      if (res.error) {
        setError(res.error);
        setSuccess('');
      }
      if (res.success) {
        setSuccess(res.success);
        setError('');
        form.reset();
        addPost(res.post);
      }
    });
  };

  const handleMediaUpload = (results: CloudinaryUploadWidgetResults) => {
    if (typeof results.info !== 'string' && results.info?.secure_url) {
      const currentValue = form.getValues('multimedia');
      form.setValue('multimedia', [...currentValue, results.info.secure_url]);
    }
  };

  const handleMediaRemove = (url: string) => {
    form.setValue(
      'multimedia',
      form.getValues('multimedia').filter(media => media !== url),
    );
  };

  const uploadedMedia = useWatch({
    control: form.control,
    name: 'multimedia',
  });

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-y-4 rounded-md bg-card/50 shadow-sm'
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
                        name='Загрузить'
                        onClick={() => {
                          open();
                        }}
                        size='icon'
                        title='Загрузить'
                        type='button'
                        variant='ghost'
                      >
                        <span className='sr-only'>Загрузить</span>
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
                    className='w-full border-none bg-transparent hover:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Напишите, что у вас нового...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            size='icon'
            variant='ghost'
            className='rounded-full'
            title='Опубликовать'
            name='Опубликовать'
          >
            <PaperPlaneIcon className='size-4' />
          </Button>
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <FormMediaList
          media={uploadedMedia}
          onRemove={handleMediaRemove}
        />
      </form>
    </Form>
  );
};
