'use client';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user/avatar';

interface UserHeaderMenuProps {
  user?: User | null;
}

export const UserHeaderMenu = ({ user }: UserHeaderMenuProps) => {

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className='sr-only'>Меню пользователя</span>
        <UserAvatar src={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/profile'>
            <Button asChild variant='link'>Профиль</Button>
          </Link>
        </DropdownMenuItem>
        <>
          <DropdownMenuItem>
            <Link href='/favorite'>
              <Button asChild variant='link'>Подписки</Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/cart'>
              <Button asChild variant='link'>Понравившееся</Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/cart'>
              <Button asChild variant='link'>Сообщения</Button>
            </Link>
          </DropdownMenuItem>
        </>
        <DropdownMenuSeparator />
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