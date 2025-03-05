export type Product = {
  id: string;
  name: string;
  price: number;
  weight: number;
  stock: number;
  quantity: number;
  image: string;
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
