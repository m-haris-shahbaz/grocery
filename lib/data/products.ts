import { Product } from '~/lib/types';

// Define base products without store information since that's circular
const productList: Omit<Product, 'store'>[] = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 4.99,
    weight: 1000, // 1kg
    stock: 50,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1569870499705-504209102861?q=80&w=1472&auto=format&fit=crop',
    storeId: 's1',
    category: 'fruits',
  },
  {
    id: '2',
    name: 'Ripe Bananas',
    price: 2.99,
    weight: 500, // 500g
    stock: 40,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1160&auto=format&fit=crop',
    storeId: 's1',
    category: 'fruits',
  },
  {
    id: '3',
    name: 'Red Tomatoes',
    price: 3.49,
    weight: 750, // 750g
    stock: 30,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1592924357228-91a3bfcefdb8?q=80&w=1470&auto=format&fit=crop',
    storeId: 's1',
    category: 'vegetables',
  },
  {
    id: '4',
    name: 'Green Broccoli',
    price: 2.49,
    weight: 500, // 500g
    stock: 25,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1583663848850-46d5ba30b8d4?q=80&w=1362&auto=format&fit=crop',
    storeId: 's1',
    category: 'vegetables',
  },
  {
    id: '5',
    name: 'Fresh Milk',
    price: 3.29,
    weight: 1000, // 1L
    stock: 45,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1480&auto=format&fit=crop',
    storeId: 's1',
    category: 'dairy',
  },
  {
    id: '6',
    name: 'Brown Eggs',
    price: 4.99,
    weight: 400, // 6 eggs
    stock: 50,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1506976773555-b3da30a63b57?q=80&w=1374&auto=format&fit=crop',
    storeId: 's2',
    category: 'dairy',
  },
  {
    id: '7',
    name: 'Whole Wheat Bread',
    price: 3.99,
    weight: 500, // 500g
    stock: 30,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1562&auto=format&fit=crop',
    storeId: 's2',
    category: 'bakery',
  },
  {
    id: '8',
    name: 'Chicken Breast',
    price: 7.99,
    weight: 500, // 500g
    stock: 20,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1374&auto=format&fit=crop',
    storeId: 's2',
    category: 'meat',
  },
  {
    id: '9',
    name: 'Atlantic Salmon',
    price: 12.99,
    weight: 400, // 400g
    stock: 15,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1599084993091-8eb467b4f614?q=80&w=1374&auto=format&fit=crop',
    storeId: 's2',
    category: 'seafood',
  },
  {
    id: '10',
    name: 'Fresh Strawberries',
    price: 4.49,
    weight: 250, // 250g
    stock: 35,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1471&auto=format&fit=crop',
    storeId: 's2',
    category: 'fruits',
  },
  {
    id: '11',
    name: 'Spinach',
    price: 2.49,
    weight: 200, // 200g
    stock: 40,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop',
    storeId: 's1',
    category: 'vegetables',
  },
  {
    id: '12',
    name: 'Greek Yogurt',
    price: 3.99,
    weight: 500, // 500g
    stock: 30,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1587&auto=format&fit=crop',
    storeId: 's1',
    category: 'dairy',
  },
  {
    id: '13',
    name: 'Ground Beef',
    price: 6.99,
    weight: 500, // 500g
    stock: 25,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop',
    storeId: 's1',
    category: 'meat',
  },
  {
    id: '14',
    name: 'Orange Juice',
    price: 3.49,
    weight: 1000, // 1L
    stock: 35,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop',
    storeId: 's3',
    category: 'beverages',
  },
  {
    id: '15',
    name: 'Pasta',
    price: 2.29,
    weight: 500, // 500g
    stock: 45,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1465&auto=format&fit=crop',
    storeId: 's3',
    category: 'grains',
  },
  {
    id: '16',
    name: 'Potato Chips',
    price: 3.29,
    weight: 150, // 150g
    stock: 50,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1470&auto=format&fit=crop',
    storeId: 's3',
    category: 'snacks',
  },
  {
    id: '17',
    name: 'Chocolate Bar',
    price: 2.99,
    weight: 100, // 100g
    stock: 60,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1335&auto=format&fit=crop',
    storeId: 's3',
    category: 'snacks',
  },
  {
    id: '18',
    name: 'Ice Cream',
    price: 4.99,
    weight: 500, // 500ml
    stock: 20,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1374&auto=format&fit=crop',
    storeId: 's3',
    category: 'frozen',
  },
  {
    id: '19',
    name: 'Honey',
    price: 7.99,
    weight: 350, // 350g
    stock: 25,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1587049633312-d628ae20a4fa?q=80&w=1480&auto=format&fit=crop',
    storeId: 's1',
    category: 'condiments',
  },
  {
    id: '20',
    name: 'Avocado',
    price: 1.99,
    weight: 200, // 200g
    stock: 30,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1376&auto=format&fit=crop',
    storeId: 's1',
    category: 'fruits',
  },
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
      product.description?.toLowerCase().includes(lowercaseQuery)
  );
};
