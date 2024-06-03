'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/src/data/user';
import { db } from '@/src/lib/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { loginSchema, registerSchema } from '@/src/schemas/auth';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedField = loginSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Неверные поля!' };
  }
  const { email, password } = validatedField.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Неверные логины или пароль' };
      } else {
        return { error: 'Что-то пошло не так' };
      }
    }
    throw error;
  }
  return { success: 'Вы вошли в аккаунт!' };
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedField = registerSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Неверные поля!' };
  }

  const { email, password, name } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email уже занят!' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: 'Успех!' };
};
