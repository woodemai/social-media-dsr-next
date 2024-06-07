import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import '@/config/globals.css';
import { VERCEL_ENV } from '@/config/next.constants.mjs';
import StoreProvider from '@/config/store/provider';
import { cn } from '@/config/utils';
import { Toaster } from '@/shared/ui/toaster';

import { ThemeProvider } from './_components/theme-provider';

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
            'min-h-dvh bg-background font-sans antialiased',
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
