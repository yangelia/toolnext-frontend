// types/tool.ts

export interface Tool {
  _id: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string[];
  rating: number;
  specifications: Record<string, string>;
  rentalTerms: string;
}
