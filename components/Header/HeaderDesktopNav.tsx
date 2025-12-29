"use client";

import Image from "next/image";
import css from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/api/clientApi";
import Modal from "../Modal/Modal";
import LogoutConfirm from "../LogoutConfirm/LogoutConfirm";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderDesktopProps {
  isAuth: boolean;
  user?: User | null;
}

const HeaderDesktopNav = ({ isAuth, user }: HeaderDesktopProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const openLogoutModal = () => setIsLogoutOpen(true);
  const closeLogoutModal = () => setIsLogoutOpen(false);

  const name = user?.name ?? "Користувач";
  console.log(user);
  const avatarLetter = name.charAt(0).toUpperCase();

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      closeLogoutModal();
      router.refresh();
    }
  };

  return (
    <>
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

            <Link className={css.publishBtnDesktop} href="/tools/new">
              Опублікувати оголошення
            </Link>

            <div className={css.userDesktop}>
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

              <span className={css.userNameDesktop}>{name}</span>

              <span className={css.userDividerDesktop} aria-hidden="true" />

              <button
                className={css.logoutBtnDesktop}
                type="button"
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
};

export default HeaderDesktopNav;
