import ToolForm from "@/components/ToolForm/ToolForm";
import { getCurrentUserServer, getToolByIdServer } from "@/lib/api/serverApi";
import { notFound, redirect } from "next/navigation";

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

  console.log(owner);

  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/auth/login");
  const currentUserId = currentUser._id;
  if (owner !== currentUserId) notFound();

  return (
    <>
      <h2>Редагування інструменту</h2>
      <ToolForm />
    </>
  );
};

export default ToolEditPage;
