import { EnvelopeClosedIcon, HeartIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';

import { ThemeToggle } from '@/components/ui/theme-toggle';

import { getFullCurrentUser } from '@/data/user';

const UserHeaderMenu = dynamic(
  () => import('./user-menu').then(mod => mod.UserHeaderMenu),
);
const NavLink = dynamic(() =>
  import('./nav-link').then(mod => mod.NavLink),
);

export const Header = async () => {
  const user = await getFullCurrentUser();

  return (
    <header className='fixed top-0 z-50 flex h-16 w-full items-center justify-between px-12 py-2 border-b border-border/50 backdrop-blur-md bg-card/30'>
      <Link
        className='flex flex-row items-center gap-x-4'
        href='/'
      >
        <Image
          alt='Logo'
          className='rounded-full'
          height={32}
          src='/icons/logo.svg'
          width={32}
        />
        <h5 className='font-bold'>DevSphere</h5>
      </Link>
      <div>
        <nav className='flex h-full items-center justify-center gap-x-4'>
          <div className='hidden sm:flex gap-x-4'>
            <NavLink
              href='/subscribe'
              name='Подписки'
            >
              <span className='sr-only'>Подписки</span>
              <IoCartOutline className='size-4' />
            </NavLink>
            <NavLink
              href='/favorite'
              name='Понравившееся'
            >
              <span className='sr-only'>Понравившееся</span>
              <HeartIcon className='size-4' />
            </NavLink>
            <NavLink
              href='/messenger'
              name='Сообщения'
            >
              <span className='sr-only'>Сообщения</span>
              <EnvelopeClosedIcon />
            </NavLink>
          </div>
          <UserHeaderMenu user={user} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};