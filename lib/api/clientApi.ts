import { CreateBookingPayload, ToolResponce } from "@/types/booking";
import { api } from './api';
import { User } from "@/types/user";

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
