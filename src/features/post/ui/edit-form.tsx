'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon, Cross1Icon, UploadIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useStore } from '@/config/store';
import { postUpsertAction } from '@/entities/post/actions';
import { postSchema, type postSchemaType } from '@/entities/post/schemas';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { FormError } from '@/shared/ui/form-error';
import { Textarea } from '@/shared/ui/textarea';

import { FormMediaList } from './form-media-list';

type PostEditFormProps = {
  id: string;
  defaultValues: Partial<postSchemaType>;
  close: () => void;
};

export const PostEditForm = ({
  defaultValues,
  close,
  id,
}: PostEditFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { updatePost } = useStore(state => state.postSlice);

  const form = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

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

  const handleSubmit = form.handleSubmit((values: postSchemaType) => {
    startTransition(async () => {
      setError(undefined);

      const { post, error } = await postUpsertAction(values, id);

      if (error) {
        return setError(error);
      }

      if (post) {
        close();
        updatePost(id, post);
      }
    });
  });

  const multimedia = useWatch({
    name: 'multimedia',
    control: form.control,
  });

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-4'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <Pencil1Icon className='size-4' />
            <h3 className='text-lg font-bold tracking-tight'>Редактирование</h3>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={close}
          >
            <Cross1Icon className='size-4' />
          </Button>
        </div>
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder='Что у вас нового?'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMediaList
          media={multimedia}
          onRemove={handleMediaRemove}
        />
        <FormError message={error} />
        <div className='flex justify-end gap-x-4'>
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
                        title='Загрузить'
                        type='button'
                        variant='secondary'
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
          <Button
            disabled={isPending}
            type='submit'
            className='space-x-2'
          >
            <Save className='size-4' />
            <span>Сохранить</span>
          </Button>
        </div>
      </motion.form>
    </Form>
  );
};
