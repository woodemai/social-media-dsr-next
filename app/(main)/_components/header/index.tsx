import logo from '../../../../public/icons/logo.png';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import React from 'react';


import { ThemeToggle } from '@/components/ui/theme-toggle';

import { getFullCurrentUser } from '@/data/user';

const UserHeaderMenu = dynamic(() =>
  import('./user-menu').then(mod => mod.UserHeaderMenu),
);
const Search = dynamic(() => import('./search').then(mod => mod.Search));

export const Header = async () => {
  const user = await getFullCurrentUser();

  return (
    <header className='fixed top-0 z-50 h-16 w-full p-2 border-b border-border/50 backdrop-blur-md bg-card/30'>
      <div className='size-full max-w-7xl mx-auto flex items-center justify-between'>
        <Link
          className='flex flex-row items-center gap-x-4'
          href='/'
        >
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
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
