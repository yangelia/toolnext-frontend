// components/Profile/UserToolsGrid.tsx
'use client';

import { ToolBasic } from '@/types/tool';
import ToolCard from '@/components/ToolCard/ToolCard';
import css from './UserToolsGrid.module.css';

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
          <ToolCard
            key={tool._id}
            tool={tool}
            isOwner={isOwner}
          />
        ))}
      </ul>
    </section>
  );
}
