import { z } from 'zod';

export const commentCreateSchema = z.object({
  body: z.string().max(300),
});