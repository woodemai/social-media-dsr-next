'use client';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { type ReactNode } from 'react';

import { cn } from '@/shared/utils';
import { Button, type ButtonProps } from '@/shared/ui/button';

interface Props extends ButtonProps {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children, ...otherProps }: Props) => {
  const pathname = usePathname();
  return (
    <Button
      className={cn(pathname === href && 'bg-muted', 'rounded-full')}
      size='icon'
      variant='ghost'
      {...otherProps}
      asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
