"use client";

import Image from "next/image";
import css from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderDesktopProps {
  isAuth: boolean;
  user?: User | null;
}

const HeaderDesktopNav = ({ isAuth, user }: HeaderDesktopProps) => {
  const router = useRouter();

  const name = user?.name ?? "Користувач";
  const avatarUrl = user?.avatarUrl ?? "";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.refresh();
    }
  };

  return (
    <nav className={css.desktopNav}>
      <Link className={css.desktopLink} href="/">
        Головна
      </Link>
      <Link className={css.desktopLink} href="/tools">
        Інструменти
      </Link>

      {!isAuth ? (
        <>
          <Link className={css.desktopLink} href="/auth/login">
            Увійти
          </Link>
          <Link className={css.registerBtn} href="/auth/register">
            Зареєструватися
          </Link>
        </>
      ) : (
        <>
          <Link className={css.desktopLink} href="/profile">
            Мій профіль
          </Link>

          <Link className={css.publishBtnDesktop} href="/tools/create">
            Опублікувати оголошення
          </Link>

          <div className={css.userDesktop}>
            <div className={css.avatarDesktop}>
              {avatarUrl ? (
                <Image src={avatarUrl} alt={name} width={32} height={32} />
              ) : (
                <span className={css.avatarPlaceholder} aria-hidden="true" />
              )}
            </div>

            <span className={css.userNameDesktop}>{name}</span>

            <span className={css.userDividerDesktop} aria-hidden="true" />

            <button
              className={css.logoutBtnDesktop}
              type="button"
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

export default HeaderDesktopNav;
