"use client";

import { ToolBasic } from "@/types/tool";
import ToolCard from "@/components/ToolCard/ToolCard";
import Link from "next/link";
import css from "./UserToolsGrid.module.css";

interface UserToolsGridProps {
  tools: ToolBasic[];
  isOwner: boolean;
}

export default function UserToolsGrid({ tools, isOwner }: UserToolsGridProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className={css.section}>
      <h2 className={css.sectionTitle}>Інструменти</h2>

      <ul className={css.grid}>
        {tools.map((tool) => (
          <li key={tool._id} className={css.item}>
            <ToolCard tool={tool} />

            {isOwner && (
              <Link
                href={`/tools/${tool._id}/edit`}
                className={css.editButton}
                aria-label="Редагувати інструмент"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.166 2.5c.442 0 .866.176 1.179.488l1.667 1.667a1.667 1.667 0 010 2.357l-10 10a1.667 1.667 0 01-.589.388l-4.167 1.667a.833.833 0 01-1.09-1.09l1.667-4.167c.086-.215.22-.407.388-.589l10-10A1.667 1.667 0 0114.166 2.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
