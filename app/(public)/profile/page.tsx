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

    console.log(
      '🔍 [getCurrentUserData] Access Token:',
      accessToken ? 'EXISTS' : 'MISSING'
    );

    if (!accessToken) {
      return null;
    }

    const response = await api.get('/users/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    console.log('🔍 [getCurrentUserData] Response:', response.data);

    return response.data.data.user;
  } catch (error) {
    console.error('❌ [getCurrentUserData] Error:', error);
    return null;
  }
}

export default async function ProfilePage() {
  console.log('🟢 [ProfilePage] START');

  const user = await getCurrentUserData();

  console.log('🔍 [ProfilePage] User:', user);
  console.log('🔍 [ProfilePage] User ID:', user?._id);

  if (!user) {
    console.log('⚠️ [ProfilePage] No user found, redirecting to login');
    redirect('/auth/login');
  }

  let userTools: ToolBasic[] = [];

  try {
    console.log('🔍 [ProfilePage] Fetching tools for user:', user._id);

    const toolsData = await getUserTools(user._id, {
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    console.log('✅ [ProfilePage] Tools Data received:', toolsData);
    console.log('🔍 [ProfilePage] Tools array:', toolsData.tools);
    console.log('🔍 [ProfilePage] Total tools:', toolsData.totalTools);
    console.log('🔍 [ProfilePage] Tools length:', toolsData.tools?.length);

    userTools = toolsData.tools || [];
  } catch (error) {
    console.error('❌ [ProfilePage] Error fetching user tools:', error);

    // Додаткова діагностика помилки
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
  }

  console.log('🔍 [ProfilePage] Final userTools:', userTools);
  console.log('🔍 [ProfilePage] userTools length:', userTools.length);
  console.log(
    '🔍 [ProfilePage] Rendering:',
    userTools.length > 0 ? 'UserToolsGrid' : 'ProfilePlaceholder'
  );

  return (
    <div className={css.container}>
      <UserProfile
        user={user}
        isOwner={true}
      />

      {userTools.length > 0 ? (
        <>
          <p
            style={{ color: 'green', fontWeight: 'bold', marginBottom: '16px' }}
          >
            ✅ Знайдено {userTools.length} інструментів
          </p>
          <UserToolsGrid
            tools={userTools}
            isOwner={true}
          />
        </>
      ) : (
        <>
          <p
            style={{
              color: 'orange',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            ⚠️ Інструментів не знайдено (userTools.length = {userTools.length})
          </p>
          <ProfilePlaceholder isOwner={true} />
        </>
      )}
    </div>
  );
}
