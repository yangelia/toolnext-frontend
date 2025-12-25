import { api } from './api';
import { User, UserPublic } from '@/types/user';
import { ToolBasic } from '@/types/tool';

// Отримання даних поточного користувача
export async function getCurrentUser(): Promise<User> {
  const res = await api.get<{
    status: string;
    message: string;
    data: { user: User };
  }>('/users/current');
  return res.data.data.user;
}

// Отримання публічних даних користувача за ID
export async function getUserById(userId: string): Promise<UserPublic> {
  const res = await api.get<{
    status: string;
    message: string;
    data: { user: UserPublic };
  }>(`/users/${userId}`);
  return res.data.data.user;
}

// Параметри для отримання інструментів користувача
export interface GetUserToolsParams {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'pricePerDay' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Відповідь від API з інструментами користувача
export interface UserToolsData {
  tools: ToolBasic[];
  totalTools: number;
  page: number;
  totalPages: number;
}

// Отримання інструментів користувача
export async function getUserTools(
  userId: string,
  params?: GetUserToolsParams
): Promise<UserToolsData> {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const res = await api.get<{
    status: string;
    message: string;
    data: UserToolsData;
  }>(`/users/${userId}/tools?${queryParams.toString()}`);

  return res.data.data;
}
