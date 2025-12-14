"use client";

import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //! test
  // const isAuth = false;
  const isAuth = true;

  const user = {
    name: "Антон Петренко",
    avatarUrl: "",
  };

  const iconId = isMenuOpen ? "icon-close" : "icon-menu";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} aria-label="ToolNext home">
          <Image
            src="/images/Tool-Next.svg"
            alt="ToolNext"
            width={124}
            height={20}
            priority
          />
        </Link>

        <div className={css.actions}>
          {isAuth && (
            <Link href="/tools/create" className={css.publishBtn}>
              Опублікувати оголошення
            </Link>
          )}
          <button
            className={css.menuBtn}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <svg
              className={css.menuIcon}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`/icons/sprite.svg#${iconId}`} />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={css.backdrop} onClick={closeMenu}>
          <div
            id="mobile-menu"
            className={css.menuPanel}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()} // прибрала закриття меню кліком на панельці
          >
            <nav className={css.nav}>
              <Link className={css.navLink} href="/" onClick={closeMenu}>
                Головна
              </Link>
              <Link className={css.navLink} href="/tools" onClick={closeMenu}>
                Інструменти
              </Link>

              {!isAuth ? (
                <>
                  <Link
                    className={css.navLink}
                    href="/auth/login"
                    onClick={closeMenu}
                  >
                    Увійти
                  </Link>

                  <Link
                    className={css.primaryBtn}
                    href="/auth/register"
                    onClick={closeMenu}
                  >
                    Зареєструватися
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className={css.navLink}
                    href="/profile"
                    onClick={closeMenu}
                  >
                    Мій профіль
                  </Link>
                  <div className={css.userRow}>
                    <div className={css.userLeft}>
                      <div className={css.avatar}>
                        {user.avatarUrl ? (
                          <Image
                            src={user.avatarUrl}
                            alt={user.name}
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
                      <p className={css.userName}>{user.name}</p>
                    </div>

                    <span className={css.userDivider} />

                    <button
                      className={css.logoutBtn}
                      aria-label="Logout"
                      onClick={closeMenu}
                    >
                      <svg width="24" height="24" aria-hidden="true">
                        <use href="/icons/sprite.svg#icon-logout" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
