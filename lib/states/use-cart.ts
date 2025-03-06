import { create } from 'zustand';
import { Product } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartState {
  CartItems: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  removeAllProducts: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      CartItems: [],
      addProduct: (product) =>
        set((state) => {
          // Check if product already exists in cart
          const existingProduct = state.CartItems.find((item) => item.id === product.id);

          if (existingProduct) {
            // If product exists, increase quantity
            return {
              CartItems: state.CartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
              ),
            };
          } else {
            // Otherwise add new product with quantity 1
            return {
              CartItems: [...state.CartItems, { ...product, quantity: 1 }],
            };
          }
        }),

      removeProduct: (productId) =>
        set((state) => ({
          CartItems: state.CartItems.filter((product) => product.id !== productId),
        })),

      removeAllProducts: () => set({ CartItems: [] }),

      increaseQuantity: (productId) =>
        set((state) => ({
          CartItems: state.CartItems.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity:
                    (product.quantity || 1) + 1 <= product.stock
                      ? (product.quantity || 1) + 1
                      : product.quantity,
                }
              : product
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          CartItems: state.CartItems.map((product) => {
            if (product.id === productId) {
              const newQuantity = (product.quantity || 1) - 1;
              // If quantity would become zero, keep it at 1
              return { ...product, quantity: Math.max(1, newQuantity) };
            }
            return product;
          }),
        })),
    }),
    {
      name: 'grocery-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Optional: Only store the cart items in storage
      partialize: (state) => ({ CartItems: state.CartItems }),
    }
  )
);
