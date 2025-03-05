import { persist } from 'zustand/middleware';
import { Address } from './types';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ShippingState {
  method: 'delivery' | 'pickup';
  address: Address;
  setAddress: (address: Address) => void;
  setMethod: (method: 'delivery' | 'pickup') => void;
}

export const useShippingMethod = create<ShippingState>()(
  persist(
    (set) => ({
      method: 'delivery',
      address: {
        id: '',
        title: '',
        type: 'home',
        address: '',
        building: '',
        isDefault: false,
      },
      setAddress: (address) => set({ address }),
      setMethod: (method) => set({ method }),
    }),
    {
      name: 'shipping-method',
      getStorage: () => AsyncStorage,
    }
  )
);
