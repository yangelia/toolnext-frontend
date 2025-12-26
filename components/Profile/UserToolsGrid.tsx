'use client';

import React from 'react';
import { ToolBasic } from '@/types/tool';
import Link from 'next/link';
import Image from 'next/image';
import css from './UserToolsGrid.module.css';

interface UserToolsGridProps {
  tools: ToolBasic[];
  isOwner: boolean;
}

export default function UserToolsGrid({ tools, isOwner }: UserToolsGridProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className={css.section}>
      <h2 className={css.sectionTitle}>Інструменти</h2>

      <ul className={css.grid}>
        {tools.map((tool) => (
          <li key={tool._id}>
            <ToolCard
              tool={tool}
              isOwner={isOwner}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ToolCardProps {
  tool: ToolBasic;
  isOwner: boolean;
}

function ToolCard({ tool, isOwner }: ToolCardProps) {
  const imageUrl = tool.image || '/images/placeholder-tool.jpg';

  const stars: React.ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        className={i < Math.floor(tool.rating) ? css.starFilled : css.star}
      >
        ★
      </span>
    );
  }

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
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={css.image}
          />
        </div>
      </Link>

      <div className={css.content}>
        <div className={css.rating}>{stars}</div>

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
            <Link
              href={`/tools/${tool._id}/edit`}
              className={css.editButton}
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
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
