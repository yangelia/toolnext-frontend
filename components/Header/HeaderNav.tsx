'use client';

// Додав useState для керування станом модального вікна
import { useState } from 'react';
import Link from 'next/link';
import css from './Header.module.css';
import Image from 'next/image';
// Видалено useRouter, оскільки логіка перенаправлення тепер всередині модалки
// Додано імпорт нового компонента підтвердження
import LogoutConfirmModal from '@/components/Profile/LogoutConfirmModal';

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderNavProps {
  isAuth: boolean;
  user?: User | null;
  onClose: () => void; // Функція для закриття мобільного меню
}

const HeaderNav = ({ isAuth, user, onClose }: HeaderNavProps) => {
  // Стан для відображення модального вікна (за замовчуванням приховано)
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const name = user?.name ?? 'Користувач';
  const avatarUrl = user?.avatarUrl ?? '';

  // Замість прямого handleLogout (async fetch) тепер використовую проміжну функцію handleLogoutClick.
  const handleLogoutClick = () => {
    onClose(); // Спочатку закриваємо мобільне навігаційне меню
    setShowLogoutModal(true); // Потім відкриваємо вікно підтвердження виходу
  };

  return (
    <>
      {' '}
      {/* Загорнуто в Fragment, щоб повернути nav та модалку одночасно */}
      <nav className={css.nav}>
        <Link
          className={css.navLink}
          href="/"
          onClick={onClose}
        >
          Головна
        </Link>
        <Link
          className={css.navLink}
          href="/tools"
          onClick={onClose}
        >
          Інструменти
        </Link>

        {!isAuth ? (
          <>
            <Link
              className={css.navLink}
              href="/auth/login"
              onClick={onClose}
            >
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
            <Link
              className={css.navLink}
              href="/profile"
              onClick={onClose}
            >
              Мій профіль
            </Link>

            <div className={css.userRow}>
              <div className={css.userLeft}>
                <div className={css.avatar}>
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
                <p className={css.userName}>{name}</p>
              </div>

              <span className={css.userDivider} />

              <button
                className={css.logoutBtn}
                aria-label="Вихід" // Локалізація aria-label (було "Logout")
                onClick={handleLogoutClick} // Викликає модалку замість прямого виходу
              >
                <svg
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#icon-logout" />
                </svg>
              </button>
            </div>
          </>
        )}
      </nav>
      {/* Умовний рендеринг модального вікна підтвердження */}
      {showLogoutModal && (
        <LogoutConfirmModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  );
};

export default HeaderNav;
