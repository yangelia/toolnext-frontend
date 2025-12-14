import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

export default function Header() {
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

        <button className={css.menuBtn} type="button" aria-label="Open menu">
          <svg
            className={css.menuIcon}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#icon-menu" />
          </svg>
        </button>
      </div>
    </header>
  );
}
