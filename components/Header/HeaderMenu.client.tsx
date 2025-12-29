"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import LogoutConfirm from "@/components/LogoutConfirm/LogoutConfirm";
import { logout } from "@/lib/api/clientApi";
import { useState } from "react";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderNavProps {
  isAuth: boolean;
  user?: User | null;
  onClose?: () => void; // ✅ СДЕЛАЛИ ОПЦИОНАЛЬНЫМ
}

export default function HeaderNav({ isAuth, user, onClose }: HeaderNavProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // ✅ безопасный обработчик
  const safeOnClose = onClose ?? (() => {});

  const openLogoutModal = () => setIsLogoutOpen(true);
  const closeLogoutModal = () => setIsLogoutOpen(false);

  const name = user?.name ?? "Користувач";
  const avatarLetter = name.charAt(0).toUpperCase();

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      closeLogoutModal();
      safeOnClose();
      router.refresh();
    }
  };

  return (
    <>
      <nav className={css.nav}>
        <Link className={css.navLink} href="/" onClick={safeOnClose}>
          Головна
        </Link>

        <Link className={css.navLink} href="/tools" onClick={safeOnClose}>
          Інструменти
        </Link>

        {!isAuth ? (
          <>
            <Link
              className={css.navLink}
              href="/auth/login"
              onClick={safeOnClose}
            >
              Увійти
            </Link>

            <Link
              className={css.primaryBtn}
              href="/auth/register"
              onClick={safeOnClose}
            >
              Зареєструватися
            </Link>
          </>
        ) : (
          <>
            <Link className={css.navLink} href="/profile" onClick={safeOnClose}>
              Мій профіль
            </Link>

            <div className={css.userRow}>
              <div className={css.userLeft}>
                <div className={css.avatar}>
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={name}
                      width={32}
                      height={32}
                      className={css.avatar}
                    />
                  ) : (
                    <div className={css.avatarPlaceholder}>{avatarLetter}</div>
                  )}
                </div>

                <p className={css.userName}>{name}</p>
              </div>

              <span className={css.userDivider} />

              <button
                className={css.logoutBtn}
                aria-label="Logout"
                onClick={openLogoutModal}
              >
                <svg width="24" height="24" aria-hidden="true">
                  <use href="/icons/sprite.svg#icon-logout" />
                </svg>
              </button>
            </div>
          </>
        )}
      </nav>

      {isLogoutOpen && (
        <Modal onClose={closeLogoutModal}>
          <LogoutConfirm
            onCancel={closeLogoutModal}
            onConfirm={confirmLogout}
            isLoading={isLoggingOut}
          />
        </Modal>
      )}
    </>
  );
}
