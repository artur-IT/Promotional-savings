import { storage } from '../utils/storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Goal,
  // AchievedGoal,
  // Saving,
  // SAVINGS_KEY,
  GOAL_KEY,
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
  // allSavings: Goal[];
  allGoals: Goal[];
  goal?: string;
  targetAmount?: number;
  // achivedGoals: AchievedGoal[];
  // addSaving: (saving: Goal) => void;
  // deleteSaving: (id: number) => void;
  // getTotalSavings: () => number;
  // getSavingsByCategory: (category: string) => Saving[];
  // clearAllSavings: () => void;
  addNewGoal: (goal: Goal) => void;
  getActualGoal: () => Goal | null;
  deleteActualGoal: () => void;
  getAllGoals: () => Goal[];
  deleteAllGoals: () => void;
}

const useSavingsStore = create<SavingsState>()(
  persist(
    (set, get) => ({
      allGoals: [],

      addNewGoal: (goal: Goal) => {
        console.log('Zapisywanie nowego celu:', goal);
        set(state => {
          const newState = {
            allGoals: [...state.allGoals, goal],
          };
          console.log('Nowy stan po dodaniu celu:', newState);
          return newState;
        });
      },

      getActualGoal: () => {
        const { allGoals } = get();
        // Zwraca aktualny cel (ostatni dodany lub aktywny)
        return allGoals.length > 0 ? allGoals[allGoals.length - 1] : null;
      },

      deleteActualGoal: () => {
        set(state => ({
          allGoals: state.allGoals.slice(0, -1), // Usuwa ostatni cel
        }));
      },

      getAllGoals: () => {
        const { allGoals } = get();
        return allGoals;
      },

      deleteAllGoals: () => {
        set({ allGoals: [] });
      },
    }),
    {
      name: GOAL_KEY,
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        allGoals: state.allGoals,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          console.log('Stan został pomyślnie odtworzony z magazynu');

          // Konwersja dat z powrotem na obiekty Date jeśli są przechowywane jako stringi
          if (state.allGoals) {
            state.allGoals = state.allGoals.map((goal: Goal) => ({
              ...goal,
              startDate:
                typeof goal.startDate === 'string'
                  ? goal.startDate
                  : new Date(goal.startDate).toISOString(),
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
