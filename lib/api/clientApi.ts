import { CreateBookingPayload, ToolResponce } from "@/types/booking";
import { api } from './api';

export async function createBooking(
  toolId: string,
  payload: CreateBookingPayload
): Promise<ToolResponce> {
  try {
    console.log("payload", payload);
    
    const res = await api.post(`/bookings/${toolId}`, payload);
    return res.data;
  } catch (err) {

    
      throw err;
  }
}
