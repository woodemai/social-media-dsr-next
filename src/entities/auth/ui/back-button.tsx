'use client';

import Link from 'next/link';

import { Button } from '@/shared/ui/button';

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      asChild
      className='w-full font-normal'
      size='sm'
      variant='link'>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
