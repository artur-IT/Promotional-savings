import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { Saving, SAVINGS_KEY } from "@/constans/dataTypes";

// Inicjalizacja instancji MMKV
const storage = new MMKV({
  id: "savings-app-storage",
});

// Adapter dla MMKV do użycia z Zustand persist
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
    return Promise.resolve(true);
  },
  removeItem: (name: string) => {
    storage.delete(name);
    return Promise.resolve();
  },
};

interface SavingsState {
  allSavings: Saving[];
  addSaving: (saving: Saving) => void;
  deleteSaving: (id: string) => void;
  updateSaving: (id: string, updatedSaving: Partial<Saving>) => void;
  getTotalSavings: () => number;
  getSavingsByCategory: (category: string) => Saving[];
  clearAllSavings: () => void;
}

const useSavingsStore = create<SavingsState>()(
  persist(
    (set, get) => ({
      allSavings: [],

      addSaving: (saving: Saving) =>
        set((state) => ({
          allSavings: [...state.allSavings, saving],
        })),

      deleteSaving: (id: string) =>
        set((state) => ({
          allSavings: state.allSavings.filter((saving) => saving.id !== id),
        })),

      updateSaving: (id: string, updatedSaving: Partial<Saving>) =>
        set((state) => ({
          allSavings: state.allSavings.map((saving) => (saving.id === id ? { ...saving, ...updatedSaving } : saving)),
        })),

      getTotalSavings: () => {
        const { allSavings } = get();
        if (!Array.isArray(allSavings)) {
          console.warn("allSavings nie jest tablicą:", allSavings);
          return 0;
        }
        return allSavings.reduce((sum, saving) => sum + saving.promotion, 0);
      },

      getSavingsByCategory: (category: string) => {
        const { allSavings } = get();
        return allSavings.filter((saving) => saving.category === category);
      },

      clearAllSavings: () => set({ allSavings: [] }),
    }),
    {
      name: SAVINGS_KEY,
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ allSavings: state.allSavings }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("Stan został pomyślnie odtworzony z magazynu");

          // Konwersja dat z powrotem na obiekty Date jeśli są przechowywane jako stringi
          if (state.allSavings) {
            state.allSavings = state.allSavings.map((saving: Saving) => ({
              ...saving,
              date: typeof saving.date === "string" ? saving.date : new Date(saving.date).toISOString(),
            }));
          }
        } else {
          console.log("Nie udało się odtworzyć stanu z magazynu");
        }
      },
    }
  )
);

export default useSavingsStore;
