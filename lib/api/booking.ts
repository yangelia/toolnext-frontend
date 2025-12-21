import { CreateBookingPayload, ToolResponce } from "@/types/booking";
import { api } from './api';
import { ToolDetails } from "@/types/tool";

export async function createBooking(
  toolId: string,
  payload: CreateBookingPayload
): Promise<ToolResponce> {
  const res = await api.post(`/bookings/${toolId}`, payload);
  return res.data;
}

export async function getToolId(toolId: string): Promise<ToolDetails> {
  const res = await api.get(`/tools/${toolId}`);
  return res.data;
}