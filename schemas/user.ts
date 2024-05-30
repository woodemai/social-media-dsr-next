import { z } from 'zod';

export const updateSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
});
