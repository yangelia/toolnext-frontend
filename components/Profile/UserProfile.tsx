import Image from "next/image";
import css from "./UserProfile.module.css";
import { UserPublic, User } from "@/types/user";

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

export default function UserProfile({ user }: UserProfileProps) {
  const username =
    typeof user === "object" && user.username && user.username.trim() !== ""
      ? user.username
      : "Користувач";

  const avatarLetter = username.charAt(0).toUpperCase();
  const avatar = user.avatar || null;

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
