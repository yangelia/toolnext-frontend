"use client";

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";
import { useDraftNote } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import type { CreateNoteRequest, NoteTag } from "@/types/note";

export default function NoteForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useDraftNote();

  const createMutation = useMutation({
    mutationFn: (values: CreateNoteRequest) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title || draft.title.length < 3) {
      alert("Title must be at least 3 characters");
      return;
    }

    if (draft.title.length > 50) {
      alert("Title is too long");
      return;
    }

    if (draft.content && draft.content.length > 500) {
      alert("Content is too long");
      return;
    }

    const payload: CreateNoteRequest = {
      title: draft.title,
      content: draft.content || "",
      tag: draft.tag || "Todo",
    };

    createMutation.mutate(payload);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title || ""}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
        />
        {createMutation.isError && (
          <span className={css.error}>Failed to create note</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content || ""}
          onChange={(e) => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag || "Todo"}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
