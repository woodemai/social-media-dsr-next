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
          <Button
            asChild
            variant='link'
          >
            <Link href='/profile'>Профиль</Link>
          </Button>
        </DropdownMenuItem>
        <>
          <DropdownMenuItem>
            <Button
              asChild
              variant='link'
            >
              <Link href='/favorite'>Подписки</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              asChild
              variant='link'
            >
              <Link href='/cart'>Понравившееся</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              asChild
              variant='link'
            >
              <Link href='/cart'>Сообщения</Link>
            </Button>
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
