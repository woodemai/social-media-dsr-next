interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <div className='flex justify-center items-center h-full'>{children}</div>
  );
}