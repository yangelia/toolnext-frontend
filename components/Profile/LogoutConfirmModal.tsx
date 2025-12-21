'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './LogoutConfirmModal.module.css';

interface LogoutConfirmModalProps {
  onClose: () => void;
}

export default function LogoutConfirmModal({
  onClose,
}: LogoutConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      onClose();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Помилка виходу:', error);
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          ✕
        </button>

        <h2 className={css.title}>Ви впевнені, що хочете вийти?</h2>

        <div className={css.actions}>
          <button
            className={css.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Залишитись
          </button>
          <button
            className={css.logoutButton}
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Вихід...' : 'Вийти'}
          </button>
        </div>
      </div>
    </div>
  );
}
