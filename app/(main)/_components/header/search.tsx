'use client';

import { User } from '@prisma/client';
import debounce from 'debounce';
import { Link } from 'next-view-transitions';
import { ChangeEvent, useState } from 'react';

import { getUsers } from '@/actions/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user/avatar';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const updateSuggestions = debounce(async (value: string) => {
    if (!value.length) return;
    const users = await getUsers(value);
    setSuggestions(users);
  }, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setSuggestions([]);
    } else {
      updateSuggestions(e.target.value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Input
          className='bg-muted px-2 py-1'
          placeholder='Найти пользователя...'
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Input
            className='border-none focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={handleChange}
            placeholder='Начните вводить имя'
            value={searchValue}
          />
        </DialogHeader>
        <Separator />
        {suggestions.length ? (
          <ul className='w-full rounded-md space-y-4'>
            {suggestions.map(suggestion => (
              <li
                className='w-full hover:underline underline-offset-4 transition-all duration-150'
                key={suggestion.id}
              >
                <DialogClose asChild>
                  <Link
                    className='min-w-full flex gap-x-4 items-center'
                    href={`/user/${suggestion.id}`}
                  >
                    <UserAvatar src={suggestion.image} />
                    {suggestion.name}
                  </Link>
                </DialogClose>
              </li>
            ))}
          </ul>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
