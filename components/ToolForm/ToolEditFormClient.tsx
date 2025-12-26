"use client";

import { useRouter } from "next/navigation";
import { ToolDetails } from "@/types/tool";
import ToolForm, { CategoryOption } from "./ToolForm";
import { updateTool } from "@/lib/api/clientApi";
import { useToolDraftStore } from "@/lib/store/toolsStore";

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
    <ToolForm
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
