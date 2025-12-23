// types/tool.ts

import type { Category } from "./category";

export interface Feedback {
  _id: string;
  name: string;
  description: string;
  rate: number;
}

export interface BookedDate {
  start: string;
  end: string;
}

export interface ToolBasic {
  _id: string;
  owner: string;
  name: string;
  pricePerDay: number;
  rating: number;
  image: string;
  category: Category;
}

export interface ToolsResponse {
  page: number;
  perPage: number;
  totalTools: number;
  totalPages: number;
  tools: ToolBasic[];
}

export interface ToolDetails {
  _id: string;
  owner: string;
  category: Category;

  name: string;
  description: string;
  pricePerDay: number;
  rating: number;

  images: string[];
  imagePublicIds: string[];
  specifications: Record<string, string>;
  rentalTerms: string;

  bookedDates: BookedDate[];
  feedbacks: Feedback[];

  createdAt: string;
  updatedAt: string;
}
