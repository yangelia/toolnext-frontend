import { notFound } from "next/navigation";

import ToolGallery from "@/components/ToolGallery/ToolGallery";
import ToolInfoBlock from "@/components/ToolInfoBlock/ToolInfoBlock";

import { getToolId } from "@/lib/api/booking";
import { ToolDetails } from "@/types/tool";

import styles from "./toolDetails.module.css";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ToolDetailsPage({ params }: PageProps) {
  let tool: ToolDetails;

  try {
    tool = await getToolId(params.id);
  } catch {
    notFound();
  }

  if (!tool) {
    notFound();
  }

  return (
    <section className={`${styles.page} container`}>
      <ToolGallery images={tool.images} />
      <ToolInfoBlock tool={tool} />
    </section>
  );
}
