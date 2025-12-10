import Link from "next/link";
import css from "./page.module.css";

export default async function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub-app is a simple and efficient application designed for
          managing personal notes. It helps keep your thoughts organized and
          accessible in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity. connection check *
        </p>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/notes/filter/all" className={css.addButton}>
            Goto Notes
          </Link>
        </div>
      </div>
    </main>
  );
}
