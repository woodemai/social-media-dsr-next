'use client';

import { CardWrapper } from '@/features/auth';
import { useLogin } from '@/shared/hooks/useLogin';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { FormError } from '@/shared/ui/form-error';
import { FormSuccess } from '@/shared/ui/form-success';
import { Input } from '@/shared/ui/input';

export const LoginForm = () => {
  const { form, error, success, isPending, onSubmit } = useLogin();
  return (
    <CardWrapper
      backButtonHref='/auth/register'
      backButtonLabel='Еще нет аккаунта?'
      headerLabel='С возвращением'
      showSocial
    >
      <Form {...form}>
        <form
          className='space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='********'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className='w-full'
            disabled={isPending}
            type='submit'
          >
            Войти
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};