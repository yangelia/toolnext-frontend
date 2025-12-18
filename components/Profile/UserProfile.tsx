import Image from 'next/image';
import css from './UserProfile.module.css';
import { UserPublic } from '@/types/user';

interface UserProfileProps {
  user: UserPublic;
  isOwner?: boolean;
}

export default function UserProfile({
  user,
  isOwner = false,
}: UserProfileProps) {
  // Перша літера імені для аватара
  const avatarLetter = user.username.charAt(0).toUpperCase();

  return (
    <div className={css.userProfile}>
      <div className={css.avatarWrapper}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>
            <span className={css.avatarLetter}>{avatarLetter}</span>
          </div>
        )}
      </div>

      <div className={css.userInfo}>
        <h1 className={css.username}>{user.username}</h1>
        {isOwner && <p className={css.email}>{user.email}</p>}
      </div>
    </div>
  );
}
