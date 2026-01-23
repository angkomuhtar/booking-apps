import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItemType = "COURT_BOOKING" | "PRODUCT";

export type CartItem = {
  id: string;
  itemType: CartItemType;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  venueId: string;
  venueName: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
};

type CartState = {
  items: CartItem[];
  venueId: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: (type: CartItemType) => number;
  getItemsByType: (type: CartItemType) => CartItem[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      venueId: null,
      addItem: (item) => {
        const currentVenueId = get().venueId;
        if (currentVenueId && currentVenueId !== item.venueId) {
          set({ items: [item], venueId: item.venueId });
          return;
        }
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          if (item.itemType === "PRODUCT") {
            set({
              items: get().items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            });
          }
        } else {
          set({
            items: [...get().items, item],
            venueId: item.venueId,
          });
        }
      },
      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        set({
          items: newItems,
          venueId: newItems.length > 0 ? get().venueId : null,
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },
      clearCart: () => set({ items: [], venueId: null }),
      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      getSubTotalPrice: (type) => {
        const data = get().items.filter((item) => item.itemType === type);
        return data.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getItemsByType: (type) => {
        const data = get().items.filter((item) => item.itemType === type);

        if (type == "COURT_BOOKING") {
          return data.sort((a, b) => {
            const dateCompare = (a.date || "").localeCompare(b.date || "");
            if (dateCompare !== 0) return dateCompare;
            return (a.startTime || "").localeCompare(b.startTime || "");
          });
        } else {
          return data;
        }
      },
      getSortedItems: () => {
        return [...get().items].sort((a, b) => {
          const dateCompare = (a.date || "").localeCompare(b.date || "");
          if (dateCompare !== 0) return dateCompare;
          return (a.startTime || "").localeCompare(b.startTime || "");
        });
      },
    }),
    { name: "cart-storage" }
  )
);
