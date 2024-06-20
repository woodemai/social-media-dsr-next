import { Link } from 'next-view-transitions';

import { Button } from '@/shared/ui/button';

const Error = () => {
  return (
    <div className='size-full flex justify-center items-center flex-col space-y-4 text-center h-dvh'>
      <h2 className='text-3xl font-bold tracking-tight'>
        Кажется, вы заплутали
      </h2>
      <p>Такой страницы не существует. Попробуйте вернуться на главную</p>
      <Button
        asChild
        variant='secondary'>
        <Link href='/'>На главную</Link>
      </Button>
    </div>
  );
};
export default Error;
