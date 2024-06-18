'use client';
import { type User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

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
        variant='link'>
        <Link href='/auth'>Войти</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu
      onOpenChange={() => setOpen(!open)}
      open={open}>
      <DropdownMenuTrigger>
        <span className='sr-only'>Меню пользователя</span>
        <UserAvatar src={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            asChild
            onClick={() => setOpen(false)}
            variant='ghost'>
            <Link
              className='font-bold'
              href={`/user/${user.id}`}>
              {user.name}
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => signOut()}
            variant='ghost'>
            Выйти
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
