import { DraftNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface DraftNoteStore {
  draft: DraftNote;
  setDraft: (partial: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useDraftNote = create<DraftNoteStore>()(
  persist(
    (set) => ({
      draft: { ...initialDraft },
      setDraft: (partialDraft: Partial<DraftNote>) =>
        set((state) => ({ draft: { ...state.draft, ...partialDraft } })),
      clearDraft: () => set({ draft: { ...initialDraft } }),
    }),
    {
      name: "draft-note",
    }
  )
);
