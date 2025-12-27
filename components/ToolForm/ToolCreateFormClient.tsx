"use client";

import { CategoryOption } from "./AddEditToolForm";
import { createTool } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useToolDraftStore } from "@/lib/store/toolsStore";
import AddEditToolForm from "./AddEditToolForm";

type Props = {
  categories: CategoryOption[];
};

export default function ToolCreateFormClient({ categories }: Props) {
  const router = useRouter();
  const clearDraft = useToolDraftStore((s) => s.clearDraft);

  const draftKey = "tool:new"; // ключ для чорнетки

  return (
    <AddEditToolForm
      categories={categories}
      toolId={draftKey}
      tool={null}
      submitLabel="Створити"
      onSubmit={async (formData) => {
        const created = await createTool(formData);

        clearDraft(draftKey);
        router.push(`/tools/${created._id}`);
      }}
    />
  );
}
