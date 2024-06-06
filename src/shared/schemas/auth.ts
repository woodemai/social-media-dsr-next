import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email обязателен',
  }),
  password: z.string().min(1, {
    message: 'Пароль обязателен',
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Email обязателен',
  }),
  password: z.string().min(8, {
    message: 'Минимум 8 символов',
  }),
  name: z.string().min(1, {
    message: 'Имя обязательно',
  }),
});