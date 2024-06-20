type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className='mx-auto w-full max-w-3xl py-8 space-y-8'>{children}</div>
  );
};

export default UserLayout;
