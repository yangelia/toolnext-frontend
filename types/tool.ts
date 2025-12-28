// types/tool.ts

import type { Category } from "./category";

/**
 * Специальный тип владельца инструмента.
 * Это НЕ полноценный User и НЕ UserPublic,
 * а view-модель, которая отражает реальный API.
 */
export type ToolOwner = {
  _id: string;
  username?: string;
  name?: string;
  avatar?: string;
  avatarUrl?: string;
};

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
  owner: ToolOwner;
  name: string;
  pricePerDay: number;
  rating: number;
  images: string[];
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
  owner: ToolOwner;
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

export type SpecPair = {
  key: string;
  value: string;
};

export type ToolDraft = {
  name: string;
  pricePerDay: string;
  category: string;
  rentalTerms: string;
  description: string;
  specifications: SpecPair[];
  image?: File | null;
};
