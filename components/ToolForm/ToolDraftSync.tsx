"use client";

import { useToolDraftStore } from "@/lib/store/toolsStore";
import { ToolDraft } from "@/types/tool";
import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";

function mergeInitialWithDraft(
  initial: ToolDraft,
  draft: Partial<ToolDraft>
): ToolDraft {
  const safeDraftImage =
    typeof draft.image === "string" || draft.image === null
      ? draft.image
      : undefined;

  return {
    ...initial,
    ...draft,
    image: safeDraftImage ?? initial.image ?? null,
    specifications: draft.specifications ?? initial.specifications,
  };
}

type Props = {
  toolId: string;
  initialValues: ToolDraft;
};

const ToolDraftSync = ({ toolId, initialValues }: Props) => {
  const { values, setValues } = useFormikContext<ToolDraft>();
  const hydrated = useToolDraftStore((s) => s.hasHydrated);
  const loadDraft = useToolDraftStore((s) => s.loadDraft);
  const patchDraft = useToolDraftStore((s) => s.patchDraft);
  const draftId = useToolDraftStore((s) => s.draftId);
  const draft = useToolDraftStore((s) => s.draft);
  const appliedRef = useRef(false);

  useEffect(() => {
    if (!hydrated || !toolId) return;
    loadDraft(toolId, initialValues);
    appliedRef.current = false; // дозволяю застосувати чернетку для нового toolId
  }, [hydrated, toolId, loadDraft, initialValues]);

  useEffect(() => {
    if (!hydrated) return;
    if (appliedRef.current) return;
    if (draftId !== toolId) return;

    if (!draft || Object.keys(draft).length === 0) {
      appliedRef.current = true;
      return;
    }

    setValues(mergeInitialWithDraft(initialValues, draft), false);
    appliedRef.current = true;
  }, [hydrated, draftId, toolId, draft, initialValues, setValues]);

  useEffect(() => {
    if (!hydrated) return;
    if (draftId !== toolId) return;
    if (!appliedRef.current) return;

    const t = setTimeout(() => {
      const { image, ...rest } = values;
      const safeImage =
        typeof image === "string" || image === null ? image : undefined;

      patchDraft({
        ...rest,
        ...(safeImage !== undefined ? { image: safeImage } : {}),
      });
    }, 300);

    return () => clearTimeout(t);
  }, [hydrated, draftId, toolId, values, patchDraft]);

  return null;
};

export default ToolDraftSync;
