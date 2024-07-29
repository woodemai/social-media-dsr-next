'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Dialog, DialogContent } from '@/shared/ui/dialog';

const ImageDialog = ({ url }: { url: string }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleOpen = () => {
    if (open) {
      setOpen(false);
      router.back();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={handleOpen}
    >
      <DialogContent className='border-none bg-transparent shadow-none'>
        <Image
          priority
          src={url}
          alt='Image'
          width={512}
          height={512}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
