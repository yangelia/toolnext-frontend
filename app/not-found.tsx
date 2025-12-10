import Link from "next/link";
import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - NoteHub",
  description:
    "The page you are looking for does not exist. Return to NoteHub to continue organizing your notes.",
  openGraph: {
    title: "Page Not Found - NoteHub",
    description:
      "The page you are looking for does not exist. Return to NoteHub to continue organizing your notes.",
    url: "https://your-app-url.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/notes/filter/all" className={css.link}>
        Go back to Notes
      </Link>
    </div>
  );
}
