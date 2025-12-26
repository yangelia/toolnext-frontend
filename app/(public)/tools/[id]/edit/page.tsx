import {
  getCategoriesServer,
  getCurrentUserServer,
  getToolByIdServer,
} from "@/lib/api/serverApi";
import { notFound, redirect } from "next/navigation";
import ToolEditFormClient from "@/components/ToolForm/ToolEditFormClient";

type MetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { id } = await params;
  const tool = await getToolByIdServer(id);
  return {
    title: `Tool: ${tool.name}`,
    description: tool.description.slice(0, 30),
  };
}

type ToolEditPageProps = {
  params: Promise<{ id: string }>;
};

const ToolEditPage = async ({ params }: ToolEditPageProps) => {
  const { id } = await params;

  const tool = await getToolByIdServer(id);
  const owner = tool.owner;

  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/auth/login");
  const currentUserId = currentUser._id;
  if (owner !== currentUserId) notFound();

  const categories = await getCategoriesServer();

  return (
    <>
      <h2>Редагування інструменту</h2>
      {/* <ToolForm categories={categories} tool={tool} toolId={id} /> */}
      <ToolEditFormClient categories={categories} toolId={id} tool={tool} />
    </>
  );
};

export default ToolEditPage;
