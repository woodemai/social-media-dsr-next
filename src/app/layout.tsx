import { ThemeProvider } from './_components/theme-provider';

import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import type { Metadata } from 'next';

import '@/config/globals.css';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from '@/config/store/provider';
import { cn } from '@/config/utils';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DevSphere',
  description: 'DevSphere social media for developers',
  keywords: ['Social', 'Media', 'Friends', 'Develop'],
  metadataBase: new URL('https://social-media-dsr-next.vercel.app/'),
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
