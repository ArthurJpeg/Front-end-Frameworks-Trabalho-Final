import axios from 'axios';

export interface FoodItem {
  id: number;
  nome: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});


export const getIngredientes = async (): Promise<FoodItem[]> => {
  const response = await apiClient.get('/food/listar');
  return response.data;
};

export const addIngrediente = async (nome: string): Promise<FoodItem> => {
  const response = await apiClient.post('/food/criar', { nome });
  return response.data;
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  await apiClient.delete(`/food/deletar/${id}`);
};

export const gerarReceita = async (): Promise<string> => {
  const response = await apiClient.get('/receita/sugerir');
  return response.data; 
};