import { Header } from './_components/header';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className='h-full'>{children}</main>
    </>
  );
};

export default MainLayout;
