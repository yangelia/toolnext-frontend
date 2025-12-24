import Image from 'next/image';

interface UserAvatarProps {
  username: string;
  avatar?: string;
  size?: number;
}

export default function UserAvatar({
  username,
  avatar,
  size = 80,
}: UserAvatarProps) {
  const avatarLetter = username.charAt(0).toUpperCase();

  return (
    <div>
      {avatar ? (
        <Image
          src={avatar}
          alt={username}
          width={size}
          height={size}
        />
      ) : (
        <div>
          <p>Аватар: {avatarLetter}</p>
        </div>
      )}
    </div>
  );
}
