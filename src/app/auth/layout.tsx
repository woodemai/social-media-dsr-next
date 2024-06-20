type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='flex justify-center items-center min-h-dvh'>{children}</div>
  );
};
export default AuthLayout;
