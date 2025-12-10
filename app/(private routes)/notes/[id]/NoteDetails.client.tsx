"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
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

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>

          <button
            className={css.closeButton}
            onClick={() => router.back()}
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
    </div>
  );
}
