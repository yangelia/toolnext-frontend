// app/(public)/profile/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProfile from "@/components/Profile/UserProfile";
import UserToolsGrid from "@/components/Profile/UserToolsGrid";
import ProfilePlaceholder from "@/components/Profile/ProfilePlaceholder";
import { getUserTools } from "@/lib/api/users";
import { User } from "@/types/user";
import { ToolBasic } from "@/types/tool";
import { api } from "@/lib/api/api";
import css from "./page.module.css";

export const dynamic = "force-dynamic";

async function getCurrentUserData(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    // Якщо токен відсутній, повертаємо null (користувач не авторизований)
    if (!accessToken) {
      return null;
    }

    // Отримуємо дані поточного користувача з API
    const response = await api.get("/users/current", {
      headers: {
        // Передаємо токен в заголовку Authorization (стандартний Bearer токен)
        Authorization: `Bearer ${accessToken.value}`,
        // Також передаємо всі cookies для сумісності з backend
        Cookie: cookieStore.toString(),
      },
    });

    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export default async function ProfilePage() {
  // Отримуємо дані користувача
  const user = await getCurrentUserData();

  console.log("PROFILE USER OBJECT (PAGE):", user);

  // Якщо користувач не авторизований, перенаправляємо на сторінку логіну
  if (!user) {
    redirect("/auth/login");
  }

  // Ініціалізуємо порожній масив для інструментів користувача
  let userTools: ToolBasic[] = [];

  try {
    // Отримуємо список інструментів користувача
    const toolsData = await getUserTools(user._id, {
      limit: 20, // Максимум 20 інструментів
      sortBy: "createdAt", // Сортуємо за датою створення
      sortOrder: "desc", // Нові інструменти спочатку
    });

    userTools = toolsData.tools || [];
  } catch (error) {
    console.error("Error fetching user tools:", error);
    // При помилці залишаємо порожній масив, щоб сторінка відобразилась
  }

  return (
    <div className={css.container}>
      {/* Профіль користувача */}
      <UserProfile user={user} isOwner={true} />

      {/* Якщо є інструменти - показуємо сітку, якщо немає - показуємо placeholder */}
      {userTools.length > 0 ? (
        <UserToolsGrid tools={userTools} isOwner={true} />
      ) : (
        <ProfilePlaceholder isOwner={true} />
      )}
    </div>
  );
}
