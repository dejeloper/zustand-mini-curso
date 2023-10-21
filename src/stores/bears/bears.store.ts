import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  computed: {
    totalBears: number;
  };

  increasedBlackBears: (by: number) => void;
  increasedPolarBears: (by: number) => void;
  increasedPandaBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearsStore = create<BearState>((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{ id: 4, name: "Grizzy Bear" }],

  computed: {
    get totalBears() {
      return (
        get().blackBears +
        get().polarBears +
        get().pandaBears +
        get().bears.length
      );
    },
  },

  increasedBlackBears: (by: number) => {
    set((state) => ({ blackBears: state.blackBears + by }));
  },

  increasedPolarBears: (by: number) => {
    set((state) => ({ polarBears: state.polarBears + by }));
  },

  increasedPandaBears: (by: number) => {
    set((state) => ({ pandaBears: state.pandaBears + by }));
  },

  doNothing: () => set((state) => ({ bears: [...state.bears] })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` },
      ],
    })),

  clearBears: () => set({ bears: [] }),
}));
