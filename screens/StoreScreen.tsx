import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Store } from '~/lib/types';
import StorePage from '~/components/store/StorePage';
import { useLocalSearchParams } from 'expo-router';

// Mock data for demonstration
const mockStores: Record<string, Store> = {
  '1': {
    id: '1',
    name: 'Fresh Market',
    address: '123 Main Street',
    city: 'Abu Dhabi',
    phone: '+971 50 123 4567',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800',
    rating: 4.7,
    categories: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'],
    products: [
      {
        id: '101',
        name: 'Red Apple',
        price: 2.99,
        weight: 500,
        stock: 50,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=400',
        category: 'Fruits',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '102',
        name: 'Organic Banana',
        price: 1.99,
        weight: 400,
        stock: 75,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=400',
        category: 'Fruits',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '103',
        name: 'Fresh Spinach',
        price: 3.49,
        weight: 300,
        stock: 30,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400',
        category: 'Vegetables',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '104',
        name: 'Whole Milk',
        price: 4.29,
        weight: 1000,
        stock: 25,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=400',
        category: 'Dairy',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '105',
        name: 'Beef Steak',
        price: 12.99,
        weight: 400,
        stock: 15,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1613454320437-0c065a830b6c?q=80&w=400',
        category: 'Meat',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '106',
        name: 'Sourdough Bread',
        price: 5.49,
        weight: 600,
        stock: 20,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=400',
        category: 'Bakery',
        store: {
          id: '1',
          name: 'Fresh Market',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Green Grocers',
    address: '456 Palm Avenue',
    city: 'Dubai',
    phone: '+971 50 987 6543',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d8d9?q=80&w=800',
    rating: 4.5,
    categories: ['Organic', 'Fruits', 'Vegetables', 'Herbs'],
    products: [
      {
        id: '201',
        name: 'Organic Avocado',
        price: 3.99,
        weight: 200,
        stock: 40,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=400',
        category: 'Organic',
        store: {
          id: '2',
          name: 'Green Grocers',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
      {
        id: '202',
        name: 'Fresh Strawberries',
        price: 4.99,
        weight: 250,
        stock: 30,
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400',
        category: 'Fruits',
        store: {
          id: '2',
          name: 'Green Grocers',
          address: '',
          city: '',
          phone: '',
          image: '',
          rating: 0,
          categories: [],
          products: [],
        },
      },
    ],
  },
};

type RouteParams = {
  StoreScreen: {
    storeId: string;
  };
};

const StoreScreen = () => {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (mockStores[storeId]) {
        setStore(mockStores[storeId]);
        setLoading(false);
      } else {
        setError('Store not found');
        setLoading(false);
      }
    }, 800);
  }, [storeId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2f6f39" />
      </View>
    );
  }

  if (error || !store) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-red-500">{error || 'Something went wrong'}</Text>
      </View>
    );
  }

  return <StorePage store={store} />;
};

export default StoreScreen;
