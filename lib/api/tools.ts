mport { clientApi } from './clientApi';

export type Category = {
  _id: string;
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await clientApi.get('/categories');
  return res.data.categories ?? res.data;
};

export const getToolById = async (id: string) => {
  const res = await clientApi.get(`/tools/${id}`);
  return res.data;
};

export const createTool = async (data: FormData) => {
  const res = await clientApi.post('/tools', data);
  return res.data;
};

export const updateTool = async (id: string, data: FormData) => {
  const res = await clientApi.patch(`/tools/${id}`, data);
  return res.data;
};