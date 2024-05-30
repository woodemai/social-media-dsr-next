import { UserNotFound } from '@/components/user/profile/not-found';
import { Profile } from '@/components/user/profile/profile';
import { currentUser } from '@/data/user';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user?.id) return <UserNotFound />;

  return <Profile id={user?.id} owner />;
}
