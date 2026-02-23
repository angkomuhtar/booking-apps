import { create } from "zustand";
import { persist } from "zustand/middleware";

type Venue = {
  id: string;
  name: string;
};

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

type PosState = {
  _hasHydrated: boolean;
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;
  addToCart: (item: CartItem) => void;
  addBulkToCart: (item: CartItem[]) => void;
  activeCart: CartItem[];
  getItemsByType: (type: CartItemType) => CartItem[];
  getSubTotalPrice: (type: CartItemType) => number;
  getTotalPrice: () => number;
  removeCart: (id: string) => void;
  updateCart: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const usePosStore = create<PosState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      selectedVenue: null,
      activeCart: [],
      draft: [],
      setSelectedVenue: (venue) => set({ selectedVenue: venue }),
      addToCart: (item) => {
        const currentVenueId = get().selectedVenue?.id;
        if (currentVenueId && currentVenueId !== item.venueId) {
          set({
            activeCart: [item],
            selectedVenue: { id: item.venueId, name: item.venueName },
          });
          return;
        }
        const existing = get().activeCart.find((i) => i.id === item.id);
        if (existing) {
          if (item.itemType === "PRODUCT") {
            set({
              activeCart: get().activeCart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            });
          }
        } else {
          set({
            activeCart: [...get().activeCart, item],
            selectedVenue: { id: item.venueId, name: item.venueName },
          });
        }
      },
      addBulkToCart: (items) => {
        set({
          activeCart: items,
          selectedVenue: { id: items[0].venueId, name: items[0].venueName },
        });
      },
      getItemsByType: (type: CartItemType) => {
        const data = get().activeCart.filter((item) => item.itemType === type);
        if (type == "COURT_BOOKING") {
          return data.sort((a, b) => {
            const courtCompare = (a.name || "").localeCompare(b.name || "");
            if (courtCompare !== 0) return courtCompare;
            const dateCompare = (a.date || "").localeCompare(b.date || "");
            if (dateCompare !== 0) return dateCompare;
            return (a.startTime || "").localeCompare(b.startTime || "");
          });
        } else {
          return data;
        }
      },
      getSubTotalPrice: (type: CartItemType) => {
        const data = get().activeCart.filter((item) => item.itemType === type);
        return data.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getTotalPrice: () => {
        const data = get().activeCart;
        return data.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      removeCart: (id: string) => {
        set({
          activeCart: get().activeCart.filter((i) => i.id !== id),
        });
      },

      updateCart: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeCart(id);
          return;
        }
        set({
          activeCart: get().activeCart.map((i) =>
            i.id === id ? { ...i, quantity } : i,
          ),
        });
      },
      clearCart: () => {
        set({ activeCart: [] });
      },
    }),
    { name: "pos-venue", skipHydration: true },
  ),
);

export const useHydratePosStore = () => {
  const hasHydrated = usePosStore((state) => state._hasHydrated);

  if (!hasHydrated && typeof window !== "undefined") {
    usePosStore.persist.rehydrate();
    usePosStore.setState({ _hasHydrated: true });
  }

  return hasHydrated;
};
