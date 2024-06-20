import { z } from 'zod';

export const createSchema = z.object({
  body: z
    .string()
    .min(5, { message: 'Пост не может содержать меньше 5 символов' })
    .max(1500, { message: 'Пост не может содержать больше 1500 символов' }),
  multimedia: z.array(z.string()),
});
