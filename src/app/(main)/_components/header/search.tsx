'use client';

import { type User } from '@prisma/client';
import { MagnifyingGlassIcon, SymbolIcon } from '@radix-ui/react-icons';
import debounce from 'debounce';
import { Link } from 'next-view-transitions';
import { type ChangeEvent, useState, useTransition } from 'react';

import { getUsersByNameAction } from '@/entities/user';
import { UserAvatar } from '@/features/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';
import { cn } from '@/shared/utils';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();

  const updateSuggestions = debounce((value: string) => {
    if (!value.length) return;
    startTransition(() => {
      void getUsersByNameAction(value).then(res => {
        setSuggestions(res);
      });
    });
  }, 500);

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
      <DialogTrigger className='flex items-center gap-x-2 rounded-md bg-muted/60 px-4 py-2 text-sm text-muted-foreground'>
        <MagnifyingGlassIcon className='size-4' />
        Найти...
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Input
            className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={handleChange}
            placeholder='Начните вводить имя'
            value={searchValue}
          />
        </DialogHeader>
        <div
          className={cn(
            'flex size-full items-center justify-center',
            !isPending && 'hidden',
          )}>
          <SymbolIcon className='size-8 animate-spin' />
        </div>
        {suggestions.length ? (
          <>
            <Separator />
            <ul className='w-full space-y-4 rounded-md'>
              {suggestions.map(suggestion => (
                <li
                  className='w-full underline-offset-4 transition-all duration-150 hover:underline'
                  key={suggestion.id}>
                  <DialogClose asChild>
                    <Link
                      className='flex min-w-full items-center gap-x-4'
                      href={`/user/${suggestion.id}`}>
                      <UserAvatar src={suggestion.image} />
                      {suggestion.name}
                    </Link>
                  </DialogClose>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
