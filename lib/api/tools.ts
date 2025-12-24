import { api } from './api';

export type Category = {
  _id: string;
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get('/categories');
  return res.data.categories ?? res.data;
};

export const getToolById = async (id: string) => {
  const res = await api.get(`/tools/${id}`);
  return res.data;
};

export const createTool = async (data: FormData) => {
  const res = await api.post('/tools', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateTool = async (id: string, data: FormData) => {
  const res = await api.patch(`/tools/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
