'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ToolBasic } from '@/types/tool';
import DeleteConfirmModal from './DeleteConfirmModal';
import css from './ToolCardProfile.module.css';

interface ToolCardProfileProps {
  tool: ToolBasic;
  isOwner: boolean;
}

export default function ToolCardProfile({
  tool,
  isOwner,
}: ToolCardProfileProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const rating = Math.round(tool.rating);

  return (
    <>
      <li className={css.card}>
        <img
          src={tool.image}
          alt={tool.name}
          className={css.image}
          loading="lazy"
        />

        <div className={css.content}>
          {/* Рейтинг */}
          <div className={css.stars}>{'★'.repeat(rating)}</div>

          {/* Назва */}
          <h4 className={css.name}>{tool.name}</h4>

          <div className={css.footer}>
            {/* Ціна */}
            <span className={css.price}>{tool.pricePerDay} грн/день</span>

            {/* Кнопки */}
            {isOwner ? (
              <div className={css.ownerActions}>
                <Link
                  href={`/tools/edit/${tool._id}`}
                  className={css.editButton}
                >
                  Редагувати
                </Link>
                <button
                  className={css.deleteButton}
                  onClick={() => setShowDeleteModal(true)}
                  aria-label="Видалити"
                  title="Видалити"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8 2V4M12 2V4M4 6H16M5 6L6 17C6 17.5 6.5 18 7 18H13C13.5 18 14 17.5 14 17L15 6M8 9V15M12 9V15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                href={`/tools/${tool._id}`}
                className={css.link}
              >
                Детальніше
              </Link>
            )}
          </div>
        </div>
      </li>

      {showDeleteModal && (
        <DeleteConfirmModal
          toolId={tool._id}
          toolName={tool.name}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
