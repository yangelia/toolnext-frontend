// types/booking.ts

export type CreateBookingPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  startDate: string;
  endDate: string;
  deliveryCity: string;
  deliveryBranch: string;
};

export type BookedDate = {
  startDate: string;
  endDate: string;
};

export type FreeSlot = {
  from: string;
  to: string | null;
};

export type BookingConflictError = {
  status: number;
  message: string;
  bookedDates?: BookedDate[];
  freeSlots?: FreeSlot[];
};

export interface ToolResponce {
  status: number;
  message: string;
  freeSlots?: FreeSlot[];
  bookedDates?: BookedDate[];
}
