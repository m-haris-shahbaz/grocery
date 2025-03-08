import { Store } from '~/lib/types';
import { products } from './products';

export const stores: Store[] = [
  {
    id: 's1',
    name: 'Fresh Market',
    address: '123 Main Street',
    city: 'Abu Dhabi',
    phone: '+971 50 123 4567',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800',
    rating: 4.7,
    categories: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'],
    deliveryFee: 5,
    minOrder: 20,
    deliveryTime: '25-35 min',
    description: 'Premium grocery store with fresh organic produce and high-quality products.',
    products: products.filter((p) =>
      ['1', '2', '3', '4', '5', '11', '12', '13', '19', '20'].includes(p.id)
    ),
  },
  {
    id: 's2',
    name: 'Green Grocers',
    address: '456 Palm Avenue',
    city: 'Dubai',
    phone: '+971 50 987 6543',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d8d9?q=80&w=800',
    rating: 4.5,
    categories: ['Organic', 'Fruits', 'Vegetables', 'Herbs'],
    deliveryFee: 3.5,
    minOrder: 15,
    deliveryTime: '20-30 min',
    description: 'Specializing in organic and locally-sourced produce with farm-to-table options.',
    products: products.filter((p) => ['3', '4', '6', '7', '8', '9', '10', '15'].includes(p.id)),
  },
  {
    id: 's3',
    name: 'Sunrise Supermarket',
    address: '789 Beach Road',
    city: 'Sharjah',
    phone: '+971 50 456 7890',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9667d9f?q=80&w=800',
    rating: 4.3,
    categories: ['Grains', 'Beverages', 'Snacks', 'International'],
    deliveryFee: 4,
    minOrder: 18,
    deliveryTime: '30-40 min',
    description: 'Full-service supermarket with international foods and everyday essentials.',
    products: products.filter((p) => ['14', '15', '16', '17', '18'].includes(p.id)),
  },
];

export const getStoreById = (id: string): Store | undefined => {
  return stores.find((store) => store.id === id);
};

export const getAllStores = (): Store[] => {
  return stores;
};

export const searchStores = (query: string): Store[] => {
  const lowercaseQuery = query.toLowerCase();
  return stores.filter(
    (store) =>
      store.name.toLowerCase().includes(lowercaseQuery) ||
      store.city.toLowerCase().includes(lowercaseQuery) ||
      store.categories.some((cat) => cat.toLowerCase().includes(lowercaseQuery))
  );
};
