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
    <div className={css.section}>
      <h2 className={css.sectionTitle}>
        {isOwner ? 'Мої інструменти' : 'Інструменти користувача'}
      </h2>
      <p className={css.count}>Всього: {tools.length}</p>

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
    </div>
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
        style={{ color: i < Math.floor(tool.rating) ? '#FFC107' : '#E0E0E0' }}
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

        <p className={css.category}>{tool.category.title}</p>
        <p className={css.price}>{tool.pricePerDay} грн/день</p>

        <div className={css.links}>
          <Link
            href={`/tools/${tool._id}`}
            className={css.detailsButton}
          >
            Детальніше
          </Link>

          {isOwner && (
            <>
              {' | '}
              <Link
                href={`/tools/${tool._id}/edit`}
                className={css.editLink}
              >
                Редагувати
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
