import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  withCredentials: true,
});
export type ApiError = AxiosError<{
  error: string;
}>;
