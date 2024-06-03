import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { login } from '@/actions/auth';
import { loginSchema } from '@/src/schemas/auth';
/**
 * `useLogin` is a custom hook that manages the login state and interactions.
 *
 * @example
 * const { form, onSubmit, error, success, isPending } = useLogin();
 *
 * @returns {Object} The login state, form handlers, and functions to manipulate it.
 * @property {UseFormReturn<z.infer<typeof loginSchema>>} form - The form object from react-hook-form.
 * @property {function(z.infer<typeof loginSchema>): void} onSubmit - Function to handle form submission.
 * @property {string | undefined} error - The current error message state.
 * @property {string | undefined} success - The current success message state.
 * @property {boolean} isPending - Indicates if a login action is pending.
 */
export const useLogin = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      setError('');
      setSuccess('');
      login(values).then(data => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return {
    form,
    error,
    success,
    isPending,
    onSubmit,
  };
};
