// app/(public)/profile/[userId]/page.tsx
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import UserProfile from "@/components/Profile/UserProfile";
import UserToolsGrid from "@/components/Profile/UserToolsGrid";
import ProfilePlaceholder from "@/components/Profile/ProfilePlaceholder";
import { getUserById, getUserTools } from "@/lib/api/users";
import { ToolBasic } from "@/types/tool";
import { api } from "@/lib/api/api";
import css from "./page.module.css";

async function getCurrentUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken) {
      return null;
    }

    const response = await api.get("/users/current", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data.data.user._id;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { userId } = await params;
  const currentUserId = await getCurrentUserId();

  let user;
  try {
    user = await getUserById(userId);
  } catch {
    console.error("Error: User not found");
    notFound();
  }

  const isOwner = currentUserId === userId;

  let userTools: ToolBasic[] = [];
  try {
    const toolsData = await getUserTools(userId, {
      limit: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    userTools = toolsData.tools || [];
  } catch {
    console.error("Error: Unable to fetch user tools");
  }

  return (
    <div className={css.container}>
      <UserProfile user={user} isOwner={isOwner} />

      {userTools.length > 0 ? (
        <UserToolsGrid tools={userTools} isOwner={isOwner} />
      ) : (
        <ProfilePlaceholder isOwner={isOwner} />
      )}
    </div>
  );
}
