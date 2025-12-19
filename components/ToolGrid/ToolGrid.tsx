import type { Tool } from "@/types/tool";
import ToolCard from "../ToolCard/ToolCard";
import css from "./ToolGrid.module.css";

interface ToolGridProps {
  tools: Tool[];
}

export default function ToolGrid({
  tools,
}: ToolGridProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <ul className={css.grid}>
      {tools.map((tool) => (
        <ToolCard
          key={tool._id}
          tool={tool}
        />
      ))}
    </ul>
  );
}
