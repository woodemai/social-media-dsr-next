import { z } from 'zod';

export const createSchema = z.object({
  body: z
    .string()
    .min(5, { message: 'Пост не может содержать меньше 5 символов' })
    .max(255, { message: 'Пост не может содержать больше 255 символов' }),
});