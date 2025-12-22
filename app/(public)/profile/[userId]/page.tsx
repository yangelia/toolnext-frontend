import { Suspense } from 'react';
import { Metadata } from 'next';
import { getUserById, getUserTools } from '@/lib/api/users';
import { getCurrentUser } from '@/lib/api/users';
import { cookies } from 'next/headers';
import UserProfile from '@/components/Profile/UserProfile';
import UserToolsGrid from '@/components/Profile/UserToolsGrid';
import ProfilePlaceholder from '@/components/Profile/ProfilePlaceholder';
import css from './ProfilePage.module.css';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { userId } = await params;
    const user = await getUserById(userId);

    return {
      title: `${user.username} - Профіль | ToolNext`,
      description: `Профіль користувача ${user.username}. Перегляньте опубліковані інструменти та обладнання для оренди.`,
      openGraph: {
        title: `${user.username} - Профіль | ToolNext`,
        description: `Профіль користувача ${user.username}`,
        type: 'profile',
      },
    };
  } catch {
    return {
      title: 'Профіль не знайдено | ToolNext',
      description: 'Користувач не знайдений',
    };
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  // Перевіряю чи це власник профілю
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  let currentUser = null;
  let isOwner = false;

  if (accessToken) {
    try {
      currentUser = await getCurrentUser();
      isOwner = currentUser._id === userId;
    } catch {
      // Користувач не авторизований
    }
  }

  // Отримую дані користувача
  let user;
  try {
    user = await getUserById(userId);
  } catch (error) {
    return (
      <div className={css.container}>
        <div className={css.error}>
          <h1>Користувача не знайдено</h1>
          <p>Можливо, профіль було видалено або посилання неправильне.</p>
        </div>
      </div>
    );
  }

  // Отримую перші 8 інструментів
  let toolsData;
  try {
    toolsData = await getUserTools(userId, {
      page: 1,
      limit: 8,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  } catch {
    toolsData = {
      tools: [],
      pagination: { page: 1, limit: 8, totalPages: 0, totalTools: 0 },
    };
  }

  const hasTools = toolsData.tools.length > 0;

  return (
    <div className={css.container}>
      <main className={css.main}>
        {/* Інформація про користувача */}
        <UserProfile
          user={user}
          isOwner={isOwner}
        />

        {/* Заголовок секції інструментів */}
        <h2 className={css.title}>Інструменти</h2>

        {/* Інструменти або Placeholder */}
        {hasTools ? (
          <Suspense
            fallback={<div className={css.loading}>Завантаження...</div>}
          >
            <UserToolsGrid
              tools={toolsData.tools}
              isOwner={isOwner}
              userId={userId}
              initialPage={1}
              totalPages={toolsData.pagination.totalPages}
            />
          </Suspense>
        ) : (
          <ProfilePlaceholder isOwner={isOwner} />
        )}
      </main>
    </div>
  );
}
