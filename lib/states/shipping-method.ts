import { createJSONStorage, persist } from 'zustand/middleware';
import { Address } from '../types';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'zod';

export interface OrderState {
  method: 'delivery' | 'pickup';
  orderAddress: Address;
  defaultAddress: Address;
  setOrderAddress: (address: Address) => void;
  setMethod: (method: 'delivery' | 'pickup') => void;
  setDefaultAddress: (address: Address) => void;
}

export const useOrderMethod = create<OrderState>()(
  persist(
    (set) => ({
      method: 'delivery',
      addressList: [],
      defaultAddress: {
        id: '',
        title: '',
        type: 'home',
        address: '',
        building: '',
        isDefault: false,
      },
      orderAddress: {
        id: '',
        title: '',
        type: 'home',
        address: '',
        building: '',
        isDefault: false,
      },
      setOrderAddress: (address) => set({ orderAddress: address }),
      setMethod: (method) => set({ method }),
      setDefaultAddress: (defaultAddress) => set({ defaultAddress }),
    }),
    {
      name: 'order-method',
      storage: createJSONStorage(() => AsyncStorage),
      // Optional: Only store the cart items in storage
      partialize: (state) => ({ defaultAddress: state.defaultAddress, method: state.method }),
    }
  )
);
