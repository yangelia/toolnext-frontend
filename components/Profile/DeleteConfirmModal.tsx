'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/api';
import css from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
  toolId: string;
  toolName: string;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  toolId,
  toolName,
  onClose,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/tools/${toolId}`);
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Помилка видалення:', error);
      alert('Не вдалося видалити інструмент. Спробуйте ще раз.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={onClose}
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити"
          disabled={isDeleting}
        >
          ✕
        </button>

        <h2 className={css.title}>
          Ви впевнені, що хочете видалити оголошення?
        </h2>
        <p className={css.subtitle}>{toolName}</p>

        <div className={css.actions}>
          <button
            className={css.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            Залишити
          </button>
          <button
            className={css.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  );
}
