import { ThemeProvider } from './_components/theme-provider';

import icon16 from '../public/icons/icon-16x16.png';
import icon192 from '../public/icons/icon-192x192.png';
import icon256 from '../public/icons/icon-256x256.png';
import icon32 from '../public/icons/icon-32x32.png';
import icon384 from '../public/icons/icon-384x384.png';
import icon512 from '../public/icons/icon-512x512.png';
import shortcut from '../public/icons/logo.ico';

import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import type { Metadata } from 'next';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from '@/src/lib/store/provider';
import { cn } from '@/src/lib/utils';


const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DevSphere',
  description: 'DevSphere social media for developers',
  icons: {
    icon: [
      {
        sizes: '16x16',
        url: icon16.src,
      },
      {
        sizes: '32x32',
        url: icon32.src,
      }
    ],
    shortcut: shortcut.src,
    apple: [
      {
        sizes: '192x192',
        url: icon192.src,
      },
      {
        sizes: '256x256',
        url: icon256.src,
      },
      {
        sizes: '384x384',
        url: icon384.src,
      },
      {
        sizes: '512x512',
        url: icon512.src,
      },
    ],
  },
  keywords: ['Social', 'Media', 'Friends', 'Develop'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang='ru'>
        <body
          className={cn(
            'h-dvh bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <StoreProvider>
              <Toaster />
              {children}
              <Analytics />
            </StoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
