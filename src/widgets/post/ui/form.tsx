'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PaperPlaneIcon, UploadIcon } from '@radix-ui/react-icons';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useStore } from '@/config/store';
import { postUpsertAction } from '@/entities/post/actions';
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
import { MFormSuccess } from '@/shared/ui/form-success';
import { Textarea } from '@/shared/ui/textarea';

export const PostForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const addPost = useStore(state => state.postSlice.addPost);
  const form = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      body: '',
      multimedia: [],
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(undefined);
      setSuccess(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error, success]);

  const onSubmit = async (values: postSchemaType) => {
    startTransition(async () => {
      const { post, error } = await postUpsertAction(values);

      if (error) {
        setError(error);
        setSuccess(undefined);
      }

      if (post) {
        setSuccess('Пост успешно создан');
        setError(undefined);
        form.reset();
        addPost(post);
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
                        disabled={isPending}
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
                  <Textarea
                    disabled={isPending}
                    {...field}
                    className='min-h-8 w-full border-none bg-transparent hover:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Напишите, что у вас нового...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
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
        <MFormSuccess message={success} />
        <FormError message={error} />
        <FormMediaList
          media={uploadedMedia}
          onRemove={handleMediaRemove}
        />
      </form>
    </Form>
  );
};
