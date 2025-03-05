export type Product = {
  id: string;
  name: string;
  price: number;
  weight: number;
  stock: number;
  quantity: number;
  image: string;
  store: Store;
  category: string;
};

export type Address = {
  id: string;
  title: string;
  type: 'home' | 'work' | 'other';
  address: string;
  building: string;
  landmark?: string;
  isDefault: boolean;
};

export type Store = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  image: string;
  rating: number;
  categories: string[];
  products: Product[];
};
