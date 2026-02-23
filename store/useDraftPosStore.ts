import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./usePosStore";

type DraftItem = {
  id: string;
  name: string;
  item: CartItem[];
  totalProductPrice: number;
  totalCourtPrice: number;
  grandTotal: number;
};

type PosState = {
  draft: DraftItem[];
  addtoDraft: (draft: DraftItem) => void;
  removeDraft: (id: string) => void;
  getDraftById: (id: string) => DraftItem | null;
};

export const useDraftPosStore = create<PosState>()(
  persist(
    (set, get) => ({
      draft: [],
      addtoDraft: (draft: DraftItem) => {
        set({ draft: [...get().draft, draft] });
      },
      removeDraft: (id: string) => {
        set({ draft: get().draft.filter((d) => d.id !== id) });
      },
      getDraftById: (id: string) => {
        const draft = get().draft.find((d) => d.id === id);
        return draft ? draft : null;
      },
    }),
    { name: "draft-pos" },
  ),
);
