import Image from "next/image";
import type { UserPublic, User } from "@/types/user";
import css from "./UserProfile.module.css";

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

export default function UserProfile({ user }: UserProfileProps) {
  const displayName = user.username ?? user.name ?? "Користувач";

  const avatarSrc =
    (user.avatar && user.avatar.trim() ? user.avatar : null) ??
    (user.avatarUrl && user.avatarUrl.trim() ? user.avatarUrl : null);

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className={css.userProfile}>
      <div className={css.avatarWrapper}>
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={displayName}
            width={120}
            height={120}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>{avatarLetter}</div>
        )}
      </div>

      <div className={css.userInfo}>
        <h1 className={css.username}>{displayName}</h1>
      </div>
    </div>
  );
}
