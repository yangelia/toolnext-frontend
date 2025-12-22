'use client';

// Додано useState для контролю видимості модального вікна
import { useState } from 'react';
import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';
// Додано імпорт компонента модалки.
// тут був useRouter для рефрешу сторінки після запиту.
import LogoutConfirmModal from '@/components/Profile/LogoutConfirmModal';

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderDesktopProps {
  isAuth: boolean;
  user?: User | null;
}

const HeaderDesktopNav = ({ isAuth, user }: HeaderDesktopProps) => {
  // Локальний стан, який визначає, чи показувати вікно підтвердження
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const name = user?.name ?? 'Користувач';
  const avatarUrl = user?.avatarUrl ?? '';

  return (
    <>
      {' '}
      {/* Додано Fragment (<>), оскільки тепер компонент повертає і <nav>, і модалку */}
      <nav className={css.desktopNav}>
        <Link
          className={css.desktopLink}
          href="/"
        >
          Головна
        </Link>
        <Link
          className={css.desktopLink}
          href="/tools"
        >
          Інструменти
        </Link>

        {!isAuth ? (
          <>
            <Link
              className={css.desktopLink}
              href="/auth/login"
            >
              Увійти
            </Link>
            <Link
              className={css.registerBtn}
              href="/auth/register"
            >
              Зареєструватися
            </Link>
          </>
        ) : (
          <>
            <Link
              className={css.desktopLink}
              href="/profile"
            >
              Мій профіль
            </Link>

            {/* створення інструменту */}
            <Link
              className={css.publishBtnDesktop}
              href="/tools/create"
            >
              Опублікувати оголошення
            </Link>

            <div className={css.userDesktop}>
              <div className={css.avatarDesktop}>
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={32}
                    height={32}
                  />
                ) : (
                  <span
                    className={css.avatarPlaceholder}
                    aria-hidden="true"
                  />
                )}
              </div>

              <span className={css.userNameDesktop}>{name}</span>
              <span
                className={css.userDividerDesktop}
                aria-hidden="true"
              />

              <button
                className={css.logoutBtnDesktop}
                type="button"
                // aria-label - укр
                aria-label="Вихід"
                // Замість handleLogout (який робив fetch) - тепер просто відкриваємо модалку через стан.
                onClick={() => setShowLogoutModal(true)}
              >
                <svg
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  {/* Використання спрайту іконок */}
                  <use href="/icons/sprite.svg#icon-logout" />
                </svg>
              </button>
            </div>
          </>
        )}
      </nav>
      {/* Умовний рендеринг модального вікна.
          onClose повертає стан у false, закриваючи вікно без виходу. */}
      {showLogoutModal && (
        <LogoutConfirmModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  );
};

export default HeaderDesktopNav;
