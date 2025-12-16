import Image from "next/image";
import css from "./Header.module.css";
import Link from "next/link";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderDesktopProps {
  isAuth: boolean;
  user: User;
}

const HeaderDesktopNav = ({ isAuth, user }: HeaderDesktopProps) => {
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
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={32}
                  height={32}
                />
              ) : (
                <span className={css.avatarPlaceholder} aria-hidden="true" />
              )}
            </div>

            <span className={css.userNameDesktop}>{user.name}</span>

            <span className={css.userDividerDesktop} aria-hidden="true" />

            <button
              className={css.logoutBtnDesktop}
              type="button"
              aria-label="Logout"
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
