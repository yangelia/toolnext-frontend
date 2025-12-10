import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { getMeServer } from "@/lib/api/serverApi";

export default async function Header() {
  let user = null;

  try {
    user = await getMeServer();
  } catch {
    user = null;
  }

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <TagsMenu />
          </li>

          <AuthNavigation user={user} />
        </ul>
      </nav>
    </header>
  );
}
