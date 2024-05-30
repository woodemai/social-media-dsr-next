interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className='mx-auto w-full max-w-3xl py-8 space-y-4'>{children}</div>
  );
}
