'use client';

import { Tool } from '@/types/tool';
import css from './UserToolsGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface UserToolsGridProps {
  tools: Tool[];
  isOwner: boolean;
}

export default function UserToolsGrid({ tools, isOwner }: UserToolsGridProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <div className={css.section}>
      <h2 className={css.sectionTitle}>Інструменти</h2>

      <div className={css.grid}>
        {tools.map((tool) => (
          <ToolCard
            key={tool._id}
            tool={tool}
            isOwner={isOwner}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент картки інструменту
interface ToolCardProps {
  tool: Tool;
  isOwner: boolean;
}

function ToolCard({ tool, isOwner }: ToolCardProps) {
  const imageUrl = tool.images[0] || '/images/placeholder-tool.jpg';

  return (
    <div className={css.card}>
      <Link
        href={`/tools/${tool._id}`}
        className={css.imageLink}
      >
        <div className={css.imageWrapper}>
          <Image
            src={imageUrl}
            alt={tool.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={css.image}
          />
        </div>
      </Link>

      <div className={css.content}>
        <div className={css.rating}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={
                i < Math.floor(tool.rating) ? css.starFilled : css.star
              }
            >
              ★
            </span>
          ))}
        </div>

        <Link
          href={`/tools/${tool._id}`}
          className={css.titleLink}
        >
          <h3 className={css.title}>{tool.name}</h3>
        </Link>

        <p className={css.price}>{tool.pricePerDay} грн/день</p>

        <div className={css.actions}>
          <Link
            href={`/tools/${tool._id}`}
            className={css.detailsButton}
          >
            Детальніше
          </Link>

          {isOwner && (
            <button
              className={css.editButton}
              aria-label="Редагувати"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.166 2.5c.442 0 .866.176 1.179.488l1.667 1.667a1.667 1.667 0 010 2.357l-10 10a1.667 1.667 0 01-.589.388l-4.167 1.667a.833.833 0 01-1.09-1.09l1.667-4.167c.086-.215.22-.407.388-.589l10-10A1.667 1.667 0 0114.166 2.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
