export interface Tool {
  _id: string;
  owner: {
    _id: string;
    username: string;
    avatar: string;
    email: string;
  };
  category: {
    _id: string;
    name: string;
  };
  name: string;
  description: string;
  pricePerDay: number;
  rating: number;
  images: string[];
  imagePublicIds: string[];
  specifications: Record<string, string>;
  rentalTerms: string;
  feedbacks: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserToolsResponse {
  status: string;
  message: string;
  data: {
    tools: Tool[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalTools: number;
    };
  };
}
