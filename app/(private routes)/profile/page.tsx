import { redirect } from 'next/navigation';
import { getServerCurrentUser } from '@/lib/api/serverApi';

export default async function PrivateProfilePage() {
  const user = await getServerCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  redirect(`/profile/${user._id}`);
}
