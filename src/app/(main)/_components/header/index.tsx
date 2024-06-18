import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import React from 'react';

import logo from '@/../public/icons/logo.png';
import { getFullCurrentUser } from '@/shared/api/user';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

import { Notifications } from './notifications';

const UserHeaderMenu = dynamic(() =>
  import('./user-menu').then(mod => mod.UserHeaderMenu),
);
const Search = dynamic(() => import('./search').then(mod => mod.Search));

export const Header = async () => {
  const user = await getFullCurrentUser();

  return (
    <header className='sticky top-0 z-50 h-16 w-full p-2 backdrop-blur-md bg-card/30'>
      <div className='size-full max-w-7xl mx-auto flex items-center justify-between'>
        <Link
          className='flex flex-row items-center gap-x-4'
          href='/'>
          <Image
            alt='Logo'
            className='rounded-full'
            height={32}
            src={logo}
            width={32}
          />
          <h5 className='font-bold'>DevSphere</h5>
        </Link>
        <nav className='flex h-full items-center justify-center gap-x-4'>
          <Search />
          <UserHeaderMenu user={user} />
          <Notifications />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
