import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/getQueryClient";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteByIdServer(id);

    const shortContent =
      note.content.length > 160
        ? note.content.substring(0, 160) + "..."
        : note.content;

    return {
      title: `${note.title} - NoteHub`,
      description: shortContent,
      openGraph: {
        title: `${note.title} - NoteHub`,
        description: shortContent,
        url: `https://your-app-url.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note Not Found - NoteHub",
      description: "The requested note could not be found.",
      openGraph: {
        title: "Note Not Found - NoteHub",
        description: "The requested note could not be found.",
        url: `https://your-app-url.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Note Not Found",
          },
        ],
      },
    };
  }
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
