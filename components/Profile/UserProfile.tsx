import Image from 'next/image';
import { UserPublic, User } from '@/types/user';
import css from './UserProfile.module.css';

interface UserProfileProps {
  user: UserPublic | User;
  isOwner?: boolean;
}

export default function UserProfile({
  user,
  isOwner = false,
}: UserProfileProps) {
  const avatarLetter = user.username.charAt(0).toUpperCase();

  return (
    <div className={css.userProfile}>
      <div className={css.avatarWrapper}>
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={100}
            height={100}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder}>{avatarLetter}</div>
        )}
      </div>

      <div className={css.userInfo}>
        <h2>Ім&apos;я: {user.username}</h2>
        {isOwner && 'email' in user && <p>Email: {user.email}</p>}
        <p>
          Зареєстрований: {new Date(user.createdAt).toLocaleDateString('uk-UA')}
        </p>
      </div>
    </div>
  );
}
