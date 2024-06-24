import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import '@/config/globals.css';
import { VERCEL_ENV } from '@/config/next.constants.mjs';
import { StoreProvider } from '@/config/store';
import { Toaster } from '@/shared/ui/toaster';
import { cn } from '@/shared/utils';

import { BackgroundFigure } from './_components/backgound-figure';
import { ThemeProvider } from './_components/theme-provider';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DevSphere',
  description: 'DevSphere social media for developers',
  keywords: ['Social', 'Media', 'Friends', 'Develop'],
  metadataBase: new URL('https://social-media-dsr-next.vercel.app/'),
  openGraph: {
    title: 'DevSphere',
    description: 'DevSphere social media for developers',
    url: 'https://social-media-dsr-next.vercel.app/',
    siteName: 'DevSphere',
  },
};
export const viewport: Viewport = {
  width: 1,
  themeColor: 'background',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <html
        lang='ru'
        suppressHydrationWarning
      >
        <body
          className={cn(
            'min-h-dvh bg-gradient-to-r from-fuchsia-200 to-indigo-200 font-sans antialiased dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700',
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
              <BackgroundFigure className='left-[50%] top-[100px]' />
              <BackgroundFigure className='left-[5%] top-[60%]' />
              <BackgroundFigure className='left-[85%] top-[70%]' />
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
};

export default RootLayout;
