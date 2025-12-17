import { api } from "./api";
import { User } from "@/types/user";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
export async function register(data: RegisterRequest) {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};