import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Title',
  description: 'Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
