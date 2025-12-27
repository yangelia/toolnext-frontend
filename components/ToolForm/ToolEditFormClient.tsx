"use client";

import { useRouter } from "next/navigation";
import { ToolDetails } from "@/types/tool";
import { CategoryOption } from "./AddEditToolForm";
import { updateTool } from "@/lib/api/clientApi";
import { useToolDraftStore } from "@/lib/store/toolsStore";
import AddEditToolForm from "./AddEditToolForm";

type Props = {
  categories: CategoryOption[];
  toolId: string;
  tool: ToolDetails;
};

export default function ToolEditFormClient({
  categories,
  toolId,
  tool,
}: Props) {
  const router = useRouter();
  const clearDraft = useToolDraftStore((s) => s.clearDraft);

  const draftKey = `tool:${toolId}`;

  return (
    <AddEditToolForm
      categories={categories}
      toolId={draftKey}
      tool={tool}
      submitLabel="Оновити"
      onSubmit={async (fd) => {
        await updateTool(toolId, fd);

        clearDraft(draftKey);
        router.push(`/tools/${toolId}`);
      }}
    />
  );
}
