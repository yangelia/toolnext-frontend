// components/Profile/UserProfile.tsx

import Image from "next/image";
import { UserPublic, User } from "@/types/user";
import css from "./UserProfile.module.css";

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

// Helper type для підтримки обох версій API
type UserWithAllFields = {
  _id: string;
  email: string;
  createdAt: string;
  name?: string;
  avatarUrl?: string;
  username?: string;
  avatar?: string;
};

export default function UserProfile({
  user,
  isOwner = false,
}: UserProfileProps) {
  const userWithAllFields = user as UserWithAllFields;

  // ✅ Підтримка обох варіантів полів
  const username =
    userWithAllFields.username ||
    userWithAllFields.name ||
    userWithAllFields.email ||
    "Користувач";

  const avatarLetter = username.charAt(0).toUpperCase();

  // ✅ Підтримка обох варіантів аватара
  const avatar =
    userWithAllFields.avatar && userWithAllFields.avatar.trim() !== ""
      ? userWithAllFields.avatar
      : userWithAllFields.avatarUrl && userWithAllFields.avatarUrl.trim() !== ""
      ? userWithAllFields.avatarUrl
      : null;

  return (
    <div className={css.userProfile}>
      <div className={css.avatarWrapper}>
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={120}
            height={120}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>{avatarLetter}</div>
        )}
      </div>

      <div className={css.userInfo}>
        <h1 className={css.username}>{username}</h1>
      </div>
    </div>
  );
}
