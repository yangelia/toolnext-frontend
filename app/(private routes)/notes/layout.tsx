import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Manage your notes",
};

interface NotesLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function NotesLayout({ children, modal }: NotesLayoutProps) {
  return (
    <div className="notes-layout">
      {modal}
      {children}
    </div>
  );
}
