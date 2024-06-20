import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Image from 'next/image';
import { ViewTransitions } from 'next-view-transitions';

import '@/config/globals.css';
import { VERCEL_ENV } from '@/config/next.constants.mjs';
import { cn } from '@/shared/utils';
import { Toaster } from '@/shared/ui/toaster';

import backgroundImage from '/public/background.png';

import { ThemeProvider } from './_components/theme-provider';
import { StoreProvider } from '@/config/store';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DevSphere',
  description: 'DevSphere social media for developers',
  keywords: ['Social', 'Media', 'Friends', 'Develop'],
  metadataBase: new URL('https://social-media-dsr-next.vercel.app/'),
};
export const viewport: Viewport = {
  width: 1,
  themeColor: 'background',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang='ru' suppressHydrationWarning>
        <body
          className={cn(
            'min-h-dvh bg-gradient-to-r from-fuchsia-200 to-indigo-200 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 font-sans antialiased',
            fontSans.variable,
          )}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem>
            <StoreProvider>
              <Toaster />
              <Image
                className='fixed top-[100px] left-[50%] -z-10 dark:brightness-50 blur-3xl'
                alt='background'
                src={backgroundImage}
              />
              <Image
                className='fixed top-[60%] left-[5%] dark:brightness-50 -z-10 blur-3xl'
                alt='background'
                src={backgroundImage}
              />
              <Image
                className='fixed top-[70%] left-[85%] -z-10 blur-3xl dark:brightness-50'
                alt='background'
                src={backgroundImage}
              />
              {children}
              {VERCEL_ENV ? (
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              ) : null}
            </StoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
