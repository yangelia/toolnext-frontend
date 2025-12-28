import Image from "next/image";
import { UserPublic, User } from "@/types/user";
import css from "./UserProfile.module.css";

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

export default function UserProfile({ user }: UserProfileProps) {
  // Единственный источник имени — username (как в API)
  const username =
    typeof user === "object" && "username" in user && user.username
      ? user.username
      : "Користувач";

  const avatarLetter = username.charAt(0).toUpperCase();

  // Аватар — только avatar (без avatarUrl, чтобы не ломать типы)
  const avatar =
    typeof user === "object" && "avatar" in user && user.avatar
      ? user.avatar
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
