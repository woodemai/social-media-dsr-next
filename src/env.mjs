import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'preview', 'production']).optional(),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    YANDEX_CLIENT_SECRET: z.string(),
    YANDEX_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(['development', 'preview', 'production'])
      .optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
