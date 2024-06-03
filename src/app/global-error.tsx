'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className='h-dvh w-full flex justify-center items-center flex-col space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tight'>
          Что-то пошло не так!
        </h2>
        <p>
          Не переживайте, скоро мы решим проблему, а пока можете повторить
          попытку
        </p>
        <Button
          onClick={() => reset()}
          variant='secondary'
        >
          Попробовать еще раз
        </Button>
        <p className='text-sx text-muted-foreground'>Ошибка: {error.message}</p>
      </body>
    </html>
  );
}
