import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note, CreateNoteRequest } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

/* --- Notes --- */
export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  perPage: number = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
  });
  return response.data;
};

export const createNote = async (newNote: CreateNoteRequest): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

/* --- Auth --- */
export type RegisterRequest = { email: string; password: string };

export const register = async (data: RegisterRequest): Promise<User> => {
  // 1. Создаём пользователя
  await nextServer.post("/auth/register", data);

  // 2. Сразу логиним, чтобы получить user и токены
  const loginRes = await nextServer.post("/auth/login", data);

  // 3. Возвращаем user, как требует Zustand
  return loginRes.data.user as User;
};

export type LoginRequest = { email: string; password: string };

export const login = async (data: LoginRequest): Promise<User> => {
  // 1. Логинимся — куки установятся автоматически
  await nextServer.post("/auth/login", data);

  // 2. Получаем информацию о текущем пользователе
  const meRes = await nextServer.get<User>("/users/me");

  // 3. Возвращаем user для Zustand
  return meRes.data;
};

/* --- Session --- */
export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<{ success: boolean }>("/auth/session");
  return res.data.success;
};

/* --- Users --- */
export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = { username?: string };

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
