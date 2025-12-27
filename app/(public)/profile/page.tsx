import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/Profile/UserProfile';
import UserToolsGrid from '@/components/Profile/UserToolsGrid';
import ProfilePlaceholder from '@/components/Profile/ProfilePlaceholder';
import { getUserTools } from '@/lib/api/users';
import { User } from '@/types/user';
import { ToolBasic } from '@/types/tool';
import { api } from '@/lib/api/api';
import css from './page.module.css';

async function getCurrentUserData(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      return null;
    }

    const response = await api.get('/users/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getCurrentUserData();

  if (!user) {
    redirect('/auth/login');
  }

  let userTools: ToolBasic[] = [];
  try {
    const toolsData = await getUserTools(user._id, {
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    userTools = toolsData.tools || [];
  } catch (error) {
    console.error('Error fetching user tools:', error);
  }

  return (
    <div className={css.container}>
      <UserProfile
        user={user}
        isOwner={true}
      />

      {userTools.length > 0 ? (
        <UserToolsGrid
          tools={userTools}
          isOwner={true}
        />
      ) : (
        <ProfilePlaceholder isOwner={true} />
      )}
    </div>
  );
}
