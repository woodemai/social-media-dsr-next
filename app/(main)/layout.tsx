import { Header } from './_components/header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className='h-full pt-16'>
        {children}
      </main>
    </>
  );
}