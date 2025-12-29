"use client";
import { User } from "@/types/user";

import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export async function register(data: RegisterRequest) {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export async function createTool(formData: FormData) {
  const res = await api.post("/tools", formData);
  return res.data;
}

export async function updateTool(id: string, formData: FormData) {
  const res = await api.patch(`/tools/${id}`, formData);
  return res.data;
}

export const deleteTool = async (id: string) => {
  await axios.delete(`/api/tools/${id}`);
};
