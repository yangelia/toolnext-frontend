export type CreateBookingPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  startDate: string;
  endDate: string;
  deliveryCity: string;
  deliveryBranch: string;
};

type BookedDate = {
  startDate: string;
  endDate: string;
};

type FreeSlot = {
  from: string,
  to: string
}

export interface ToolResponce {
  status: number;
  message: string;
  freeSlots?: FreeSlot[];
  bookedDates?: BookedDate[];
};