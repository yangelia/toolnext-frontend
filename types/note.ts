export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
}
