import { z } from 'zod';

export const commentSchema = z.object({
  body: z.string().max(300),
});
export type commentSchemaType = z.infer<typeof commentSchema>;
