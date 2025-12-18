import { Tool } from "@/types/tool";
import ToolInfoBlock from "@/components/ToolInfoBlock/ToolInfoBlock";

interface PageProps {
  params: {
    toolId: string;
  };
}

async function getToolById(id: string): Promise<Tool> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tool");
  }

  return res.json();
}

async function getCurrentUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ToolPage({ params }: PageProps) {
  const tool = await getToolById(params.toolId);
  const user = await getCurrentUser();

  return <ToolInfoBlock tool={tool} isAuthenticated={Boolean(user)} />;
}
