'use client';

import { useState } from 'react';
import { Tool } from '@/types/tool';
import { getUserTools } from '@/lib/api/users';
import ToolCardProfile from '@/components/Profile/ToolCardProfile';
import css from './UserToolsGrid.module.css';

interface UserToolsGridProps {
  tools: Tool[];
  isOwner: boolean;
  userId: string;
  initialPage: number;
  totalPages: number;
}

export default function UserToolsGrid({
  tools: initialTools,
  isOwner,
  userId,
  initialPage,
  totalPages,
}: UserToolsGridProps) {
  const [tools, setTools] = useState(initialTools);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const hasMore = currentPage < totalPages;

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await getUserTools(userId, {
        page: nextPage,
        limit: 8,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      setTools((prev) => [...prev, ...data.tools]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Помилка завантаження інструментів:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.section}>
      <div className={css.grid}>
        {tools.map((tool) => (
          <ToolCardProfile
            key={tool._id}
            tool={tool}
            isOwner={isOwner}
          />
        ))}
      </div>

      {hasMore && (
        <div className={css.loadMoreWrapper}>
          <button
            className={css.loadMoreButton}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Завантаження...' : 'Показати більше'}
          </button>
        </div>
      )}
    </div>
  );
}
