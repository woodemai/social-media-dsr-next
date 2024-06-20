type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-8 py-8'>{children}</div>
  );
};

export default UserLayout;
