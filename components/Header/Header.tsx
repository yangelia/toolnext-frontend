import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";
import HeaderMenu from "./HeaderMenu.client";
import HeaderDesktopNav from "./HeaderDesktopNav";
import { getServerCurrentUser } from "@/lib/api/serverApi";

export default async function Header() {
  const user = await getServerCurrentUser();
  console.log("Header user:", user);
  const isAuth = Boolean(user);

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
            <Link href="/tools/new" className={css.publishBtn}>
              Опублікувати оголошення
            </Link>
          )}

          <HeaderMenu isAuth={isAuth} user={user} />
        </div>

        <HeaderDesktopNav isAuth={isAuth} user={user} />
      </div>
    </header>
  );
}
