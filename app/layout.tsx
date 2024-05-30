import { ThemeProvider } from './_components/theme-provider';

import { Inter as FontSans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import type { Metadata } from 'next';

import './globals.css';
import { cn } from '@/lib/utils';


const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DevSphere',
  description: 'DevSphere social media for developers',
  icons: {
    shortcut: './icons/logo.svg',
  },
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
