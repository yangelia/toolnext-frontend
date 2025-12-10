"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Something went wrong.</p>}
        {!isLoading && !error && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button
                className={css.closeButton}
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <span className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <span className={css.tag}>{note.tag}</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
