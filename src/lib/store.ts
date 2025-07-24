import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  itemId: string;
  quantity: number;
  name: string;
  price: number;
  emoji?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
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
          const existingItem = state.items.find(i => i.itemId === item.itemId);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.itemId === item.itemId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.itemId === itemId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.itemId !== itemId),
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

// Utility function for consistent session ID generation
export const getSessionId = () => {
  if (typeof window === 'undefined') return 'default';

  // Try to get existing session ID from localStorage
  let sessionId = localStorage.getItem('cart-session-id');

  if (!sessionId) {
    // Generate new session ID
    sessionId = `session-${window.location.hostname}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart-session-id', sessionId);
  }

  return sessionId;
};

// Function to clear cart when user leaves the site
export const setupCartCleanup = (clearCartMutation: any) => {
  if (typeof window === 'undefined') return;

  let cleanupTimeout: NodeJS.Timeout | null = null;

  const handleBeforeUnload = async () => {
    const sessionId = getSessionId();
    if (sessionId && sessionId !== 'default') {
      try {
        // Clear the user's cart when they leave
        await clearCartMutation({ sessionId });
      } catch (error) {
        console.log('Cart cleanup error:', error);
      }
    }
  };

  const handleVisibilityChange = async () => {
    const sessionId = getSessionId();
    if (sessionId && sessionId !== 'default') {
      if (document.visibilityState === 'hidden') {
        // Set a timeout to clear cart after 5 minutes of inactivity
        cleanupTimeout = setTimeout(async () => {
          try {
            await clearCartMutation({ sessionId });
          } catch (error) {
            console.log('Cart cleanup error:', error);
          }
        }, 5 * 60 * 1000); // 5 minutes
      } else {
        // User came back, clear the timeout
        if (cleanupTimeout) {
          clearTimeout(cleanupTimeout);
          cleanupTimeout = null;
        }
      }
    }
  };

  // Add event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Return cleanup function
  return () => {
    if (cleanupTimeout) {
      clearTimeout(cleanupTimeout);
    }
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};