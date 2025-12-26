// types/tool.ts

import type { Category } from './category';
import type { User, UserPublic } from './user';

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
  owner: string; // БД повертає ID (string)
  name: string;
  pricePerDay: number;
  rating: number;
  image: string;
  category: string; // БД повертає ID категорії (string)
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
  owner: string; // Виправлено: БД повертає ID юзера
  category: string; // Виправлено: БД повертає ID категорії

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
