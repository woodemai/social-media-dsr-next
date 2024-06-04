'use client';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { Link } from 'next-view-transitions';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user/avatar';

interface UserHeaderMenuProps {
  user?: User | null;
}

export const UserHeaderMenu = ({ user }: UserHeaderMenuProps) => {
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Button
        asChild
        size='sm'
        variant='link'
      >
        <Link href='/auth'>Войти</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu
      onOpenChange={() => setOpen(!open)}
      open={open}
    >
      <DropdownMenuTrigger>
        <span className='sr-only'>Меню пользователя</span>
        <UserAvatar src={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            asChild
            onClick={() => setOpen(false)}
            variant='link'
          >
            <Link
              className='font-bold'
              href={`/user/${user.id}`}
            >
              {user.name}
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => signOut()}
            variant='link'
          >
            Выйти
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};