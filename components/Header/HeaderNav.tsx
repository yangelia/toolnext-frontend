"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderNavProps {
  isAuth: boolean;
  user?: User | null;
  onClose: () => void;
}

const HeaderNav = ({ isAuth, user, onClose }: HeaderNavProps) => {
  const router = useRouter();

  const name = user?.name ?? "Користувач";
  const avatarUrl = user?.avatarUrl ?? "";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      onClose();
      router.refresh();
    }
  };

  return (
    <nav className={css.nav}>
      <Link className={css.navLink} href="/" onClick={onClose}>
        Головна
      </Link>
      <Link className={css.navLink} href="/tools" onClick={onClose}>
        Інструменти
      </Link>

      {!isAuth ? (
        <>
          <Link className={css.navLink} href="/auth/login" onClick={onClose}>
            Увійти
          </Link>

          <Link
            className={css.primaryBtn}
            href="/auth/register"
            onClick={onClose}
          >
            Зареєструватися
          </Link>
        </>
      ) : (
        <>
          <Link className={css.navLink} href="/profile" onClick={onClose}>
            Мій профіль
          </Link>

          <div className={css.userRow}>
            <div className={css.userLeft}>
              <div className={css.avatar}>
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={name} width={32} height={32} />
                ) : (
                  <span className={css.avatarPlaceholder} aria-hidden="true" />
                )}
              </div>
              <p className={css.userName}>{name}</p>
            </div>

            <span className={css.userDivider} />

            <button
              className={css.logoutBtn}
              aria-label="Logout"
              onClick={handleLogout}
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/icons/sprite.svg#icon-logout" />
              </svg>
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default HeaderNav;
