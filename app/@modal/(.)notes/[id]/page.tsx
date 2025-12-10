import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/getQueryClient";
import NotePreview from "./NotePreview.client";

export default async function InterceptedNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
