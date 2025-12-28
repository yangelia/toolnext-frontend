import Image from "next/image";
import { UserPublic, User } from "@/types/user";
import css from "./UserProfile.module.css";

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

export default function UserProfile({
  user,
  isOwner = false,
}: UserProfileProps) {
  // Защита: если username вдруг пустой/undefined — не падаем на charAt
  const username = user?.username ?? "Користувач";
  const avatarLetter = username.charAt(0).toUpperCase();

  return (
    <div className={css.userProfile}>
      <div className={css.avatarWrapper}>
        {user?.avatar ? (
          <Image
            src={user.avatar}
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
