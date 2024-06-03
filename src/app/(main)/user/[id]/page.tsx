import { Profile } from '@/components/user/profile/profile';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params: { id } }: UserPageProps) {
  return <Profile id={id} />;
}
