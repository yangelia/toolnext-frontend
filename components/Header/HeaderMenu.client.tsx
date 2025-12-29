"use client";

import { useEffect, useState } from "react";
import css from "./Header.module.css";
import HeaderNav from "./HeaderNav";

type User = {
  name: string;
  avatarUrl: string;
};

interface HeaderMenuProps {
  isAuth: boolean;
  user?: User | null;
}

export default function HeaderMenu({ isAuth, user }: HeaderMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const iconId = isMenuOpen ? "icon-close" : "icon-menu";
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
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

  return (
    <>
      <button
        className={css.menuBtn}
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        <svg className={css.menuIcon} width="24" height="24" aria-hidden="true">
          <use href={`/icons/sprite.svg#${iconId}`} />
        </svg>
      </button>

      {isMenuOpen && (
        <div className={css.backdrop} onClick={closeMenu}>
          <div
            id="mobile-menu"
            className={css.menuPanel}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <HeaderNav isAuth={isAuth} user={user} onClose={closeMenu} />
          </div>
        </div>
      )}
    </>
  );
}
