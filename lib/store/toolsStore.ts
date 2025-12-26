// lib\store\toolsStore.ts

import { create } from "zustand";
import type { ToolBasic, ToolDraft } from "@/types/tool";
import { fetchToolsClient } from "@/lib/api/tools.client";
import { createJSONStorage, persist } from "zustand/middleware";

interface ToolsState {
  tools: ToolBasic[];
  page: number;
  totalPages: number;
  isLoading: boolean;

  category: string | null; // тут зберігаємо _id категорії або null
  search: string;

  reset: () => void;
  setCategory: (category: string | null) => void;
  setSearch: (search: string) => void;
  loadTools: (reset?: boolean) => Promise<void>;
}

export const useToolsStore = create<ToolsState>((set, get) => ({
  tools: [],
  page: 1,
  totalPages: 1,
  isLoading: false,

  category: null,
  search: "",

  reset: () =>
    set({
      tools: [],
      page: 1,
      totalPages: 1,
    }),

  setCategory: (category) => {
    set({ category }); // category = _id або null
    get().reset();
    get().loadTools(true);
  },

  setSearch: (search) => {
    set({ search });
    get().reset();
    get().loadTools(true);
  },

  loadTools: async (reset = false) => {
    const { page, category, search, tools } = get();
    set({ isLoading: true });

    try {
      // Формуємо params так, щоб category не передавалося, якщо null
      const params = {
        page,
        perPage: 16,
        search: search || undefined,
        ...(category ? { category } : {}),
      };

      const data = await fetchToolsClient(params);

      set({
        tools: reset ? data.tools : [...tools, ...data.tools],
        page: page + 1,
        totalPages: data.totalPages,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to load tools:", err);
      set({ isLoading: false });
    }
  },
}));

//! чорнетка
type ToolDraftStore = {
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  draftId: string | null;
  draft: Partial<ToolDraft>;
  loadDraft: (id: string, initial: ToolDraft) => void; // для edit
  setDraft: (data: Partial<ToolDraft>) => void;
  patchDraft: (data: Partial<ToolDraft>) => void;
  clearDraft: (id?: string) => void;
};

export const useToolDraftStore = create<ToolDraftStore>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      draftId: null,
      draft: {},
      loadDraft: (id, initial) => {
        const { draftId, draft } = get();
        if (draftId === id && Object.keys(draft).length > 0) return;
        set({ draftId: id, draft: initial });
      },
      setDraft: (data) => set({ draft: data }),
      patchDraft: (data) =>
        set((state) => ({ draft: { ...state.draft, ...data } })),
      clearDraft: (id) =>
        set((state) => {
          if (id && state.draftId !== id) return state;
          return { draftId: null, draft: {} };
        }),
    }),
    {
      name: "tool-edit-draft",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
