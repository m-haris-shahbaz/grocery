import { supabase } from './supabase';

export async function getStores() {
  const { data, error } = await supabase.from('stores').select('*');
  if (error) throw error;
  return data;
}

export async function getStoreById(id: string) {
  const { data, error } = await supabase.from('stores').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getProductsByStoreId(storeId: string) {
  const { data, error } = await supabase.from('products').select('*').eq('storeId', storeId);
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
}

export async function getCategoryProducts(category: string) {
  const { data, error } = await supabase.from('products').select('*').eq('category', category);
  if (error) throw error;
  return data;
}
