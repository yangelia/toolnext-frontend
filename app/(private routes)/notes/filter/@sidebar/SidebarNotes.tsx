"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import css from "./SidebarNotes.module.css";

const tags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string[];
  const currentTag = slug?.[0] || "all";
  const currentPage = searchParams.get("page") || "1";

  return (
    <div className={css.sidebar}>
      <h3 className={css.title}>Filter by Tag</h3>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href={`/notes/filter/all?page=${currentPage}`}
            className={`${css.menuLink} ${
              currentTag === "all" ? css.active : ""
            }`}
          >
            All notes
          </Link>
        </li>
        {tags
          .filter((tag) => tag !== "all")
          .map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}?page=${currentPage}`}
                className={`${css.menuLink} ${
                  currentTag === tag ? css.active : ""
                }`}
              >
                {tag}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
