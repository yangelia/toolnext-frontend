import { redirect } from "next/navigation";
import UserProfile from "@/components/Profile/UserProfile";
import UserToolsGrid from "@/components/Profile/UserToolsGrid";
import ProfilePlaceholder from "@/components/Profile/ProfilePlaceholder";
import { getUserTools } from "@/lib/api/users";
import { getCurrentUserServer } from "@/lib/api/serverApi";
import { ToolBasic } from "@/types/tool";
import css from "./page.module.css";

export default async function ProfilePage() {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/auth/login");
  }

  let userTools: ToolBasic[] = [];
  try {
    const toolsData = await getUserTools(user._id, {
      limit: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    userTools = toolsData.tools || [];
  } catch {}

  return (
    <div className={css.container}>
      <UserProfile user={user} isOwner />

      {userTools.length > 0 ? (
        <UserToolsGrid tools={userTools} isOwner />
      ) : (
        <ProfilePlaceholder isOwner />
      )}
    </div>
  );
}
