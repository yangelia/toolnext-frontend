"use client";
import Modal from "./Modal";
import css from "./DeleteConfirmModal.module.css";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <div className={css.content}>
        <h2 className={css.title}>
          Ви впевнені, що хочете видалити оголошення?
        </h2>

        <div className={css.buttons}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCancel}
            disabled={isDeleting}
          >
            Залишити
          </button>
          <button
            type="button"
            className={css.deleteButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Видалення..." : "Видалити"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
