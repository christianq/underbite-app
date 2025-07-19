import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  sandwichId: string;
  quantity: number;
  name: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (sandwichId: string, quantity: number) => void;
  removeItem: (sandwichId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.sandwichId === item.sandwichId);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.sandwichId === item.sandwichId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      updateQuantity: (sandwichId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.sandwichId === sandwichId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      removeItem: (sandwichId) => {
        set((state) => ({
          items: state.items.filter(item => item.sandwichId !== sandwichId),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);