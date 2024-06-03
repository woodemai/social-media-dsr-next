'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/src/hooks/useLogin';

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