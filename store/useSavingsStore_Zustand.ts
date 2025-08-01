import { storage } from '../utils/storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Goal,
  AchievedGoal,
  Saving,
  SAVINGS_KEY,
} from '../constants/dataTypes';

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
  achivedGoals: AchievedGoal[];
  addSaving: (saving: Saving) => void;
  deleteSaving: (id: string) => void;
  updateSaving: (id: string, updatedSaving: Partial<Saving>) => void;
  getTotalSavings: () => number;
  getSavingsByCategory: (category: string) => Saving[];
  clearAllSavings: () => void;
  addAchivedGoal: (goal: AchievedGoal) => void;
  deleteAchivedGoal: (id: string) => void;
  getAchivedGoals: () => AchievedGoal[];
  checkAndAchieveGoal: (goal: Goal, totalPromotionSum: number) => boolean;
}

const useSavingsStore = create<SavingsState>()(
  persist(
    (set, get) => ({
      allSavings: [],
      achivedGoals: [],

      // Achieved Goals
      addAchivedGoal: (goal: AchievedGoal) =>
        set(state => ({
          achivedGoals: [...state.achivedGoals, goal],
        })),

      deleteAchivedGoal: (id: string) =>
        set(state => ({
          achivedGoals: state.achivedGoals.filter(goal => goal.id !== id),
        })),

      getAchivedGoals: () => {
        const { achivedGoals } = get();
        return achivedGoals;
      },

      // Funkcja sprawdzająca i zapisująca osiągnięty cel
      checkAndAchieveGoal: (goal: Goal, totalPromotionSum: number) => {
        const { achivedGoals } = get();

        // Sprawdź czy cel już został osiągnięty wcześniej
        const alreadyAchieved = achivedGoals.some(
          achievedGoal => achievedGoal.id === goal.id,
        );

        if (alreadyAchieved) {
          return false; // Cel już został osiągnięty
        }

        // Sprawdź czy cel został osiągnięty
        if (totalPromotionSum >= goal.targetAmount) {
          const achievedGoal: AchievedGoal = {
            ...goal,
            totalPromotionSum,
            achievedDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
          };

          // Zapisz osiągnięty cel
          set(state => ({
            achivedGoals: [...state.achivedGoals, achievedGoal],
          }));

          console.log(`🎉 Cel "${goal.goal}" został osiągnięty!`);
          return true;
        }

        return false;
      },

      // Savings
      addSaving: (saving: Saving) =>
        set(state => ({
          allSavings: [...state.allSavings, saving],
        })),

      deleteSaving: (id: string) =>
        set(state => ({
          allSavings: state.allSavings.filter(saving => saving.id !== id),
        })),

      updateSaving: (id: string, updatedSaving: Partial<Saving>) =>
        set(state => ({
          allSavings: state.allSavings.map(saving =>
            saving.id === id ? { ...saving, ...updatedSaving } : saving,
          ),
        })),

      getTotalSavings: () => {
        const { allSavings } = get();
        if (!Array.isArray(allSavings)) {
          console.warn('allSavings nie jest tablicą:', allSavings);
          return 0;
        }
        return allSavings.reduce((sum, saving) => sum + saving.promotion, 0);
      },

      getSavingsByCategory: (category: string) => {
        const { allSavings } = get();
        return allSavings.filter(saving => saving.category === category);
      },

      clearAllSavings: () => set({ allSavings: [] }),
    }),
    {
      name: SAVINGS_KEY,
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        allSavings: state.allSavings,
        achivedGoals: state.achivedGoals,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          console.log('Stan został pomyślnie odtworzony z magazynu');

          // Konwersja dat z powrotem na obiekty Date jeśli są przechowywane jako stringi
          if (state.allSavings) {
            state.allSavings = state.allSavings.map((saving: Saving) => ({
              ...saving,
              date:
                typeof saving.date === 'string'
                  ? saving.date
                  : new Date(saving.date).toISOString(),
            }));
          }
        } else {
          console.log('Nie udało się odtworzyć stanu z magazynu');
        }
      },
    },
  ),
);

export default useSavingsStore;
