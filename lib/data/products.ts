import { Product } from '~/lib/types';

// Define base products without store information since that's circular
const productList: Omit<Product, 'store'>[] = [
  {
    id: '1',
    name: 'Fresh Apple',
    weight: 1000,
    price: 5.99,
    image: 'https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg',
    stock: 25,
    description: 'Fresh, crisp apples. Rich in fiber and antioxidants.',
    category: 'Fruits',
    storeId: 's1',
    quantity: 0,
  },
  {
    id: '2',
    name: 'Organic Banana',
    weight: 1000,
    price: 3.99,
    image: 'https://clipart-library.com/image_gallery2/Banana.png',
    stock: 40,
    description: 'Organic bananas. Good source of potassium and vitamins.',
    category: 'Fruits',
    storeId: 's1',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Juicy Orange',
    weight: 1000,
    price: 6.49,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
    stock: 30,
    description: 'Sweet and juicy oranges. High in vitamin C.',
    category: 'Fruits',
    storeId: 's1',
    quantity: 0,
  },
  {
    id: '4',
    name: 'Premium Grapes',
    weight: 500,
    price: 7.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Table_grapes_on_white.jpg',
    stock: 15,
    description: 'Sweet and seedless grapes. Great for snacking.',
    category: 'Fruits',
    storeId: 's1',
    quantity: 0,
  },
  {
    id: '5',
    name: 'Ripe Mango',
    weight: 1000,
    price: 8.49,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg',
    stock: 20,
    description: 'Perfectly ripe mangoes. Sweet and fragrant.',
    category: 'Fruits',
    storeId: 's1',
    quantity: 0,
  },
  // More products...
  // ...existing code for products 6-20...
];

// This creates a fully populated product list with store references that will be added later
export const products: Product[] = productList.map((product) => ({
  ...product,
  store: {} as any, // Will be populated in stores.ts
}));

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
  );
};
