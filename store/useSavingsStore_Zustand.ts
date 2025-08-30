import { storage } from '../utils/storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Goal, GOAL_KEY } from '../constants/dataTypes';

// Type for individual saving from Goal interface
type Saving = NonNullable<Goal['savings']>[0];

// Adapter dla AsyncStorage do użycia z Zustand persist
const asyncStorageAdapter = {
  getItem: async (name: string) => {
    try {
      const value = await storage.getString(name);
      return value || null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await storage.set(name, value);
      return true;
    } catch (error) {
      console.error('Error setting item:', error);
      return false;
    }
  },
  removeItem: async (name: string) => {
    try {
      await storage.delete(name);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },
};

interface SavingsState {
  todayDate: string;
  allGoals: Goal[];
  addNewGoal: (goal: Goal) => void;
  getActualGoal: () => Goal | null;
  getLastGoal: () => Goal | null;
  deleteActualGoal: () => void;
  getAllGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  deleteAllGoals: () => void;
  updateCurrentGoal: (
    newGoal?: string,
    newTargetAmount?: number,
    saving?: { id: number; promotion: number; date: string; category: string },
  ) => void;
  completeGoal: () => void;
  getAllSavings: () => Saving[];
  deleteSaving: (savingId: number) => void;
  isSavingFromActiveGoal: (savingId: number) => boolean;
  isLatestSavingFromActiveGoal: (savingId: number) => boolean;
}

// Helper function to find active goal index
const findActiveGoalIndex = (goals: Goal[]) => {
  return goals.findIndex(goal => !goal.endDate);
};

const useSavingsStore = create<SavingsState>()(
  persist(
    (set, get) => ({
      allGoals: [],

      addNewGoal: (goal: Goal) => {
        set(state => ({
          allGoals: [...state.allGoals, goal],
        }));
      },

      getActualGoal: () => {
        const { allGoals } = get();
        // Zwraca tylko aktywny cel (bez endDate)
        const activeGoals = allGoals.filter(goal => !goal.endDate);
        return activeGoals.length > 0
          ? activeGoals[activeGoals.length - 1]
          : null;
      },

      getLastGoal: () => {
        const { allGoals } = get();
        // Zwraca ostatni cel (aktywny lub ukończony)
        return allGoals.length > 0 ? allGoals[allGoals.length - 1] : null;
      },

      deleteActualGoal: () => {
        set(state => {
          const currentGoals = [...state.allGoals];
          const activeGoalIndex = findActiveGoalIndex(currentGoals);

          if (activeGoalIndex !== -1) {
            currentGoals.splice(activeGoalIndex, 1);
          }

          return { allGoals: currentGoals };
        });
      },

      getAllGoals: () => {
        const { allGoals } = get();
        return allGoals;
      },

      getCompletedGoals: () => {
        const { allGoals } = get();
        // Zwraca tylko ukończone cele (z endDate)
        return allGoals.filter(goal => goal.endDate);
      },

      deleteAllGoals: () => {
        set({ allGoals: [] });
      },

      updateCurrentGoal: (
        newGoal?: string,
        newTargetAmount?: number,
        saving?: {
          id: number;
          promotion: number;
          date: string;
          category: string;
        },
      ) => {
        set(state => {
          const currentGoals = [...state.allGoals];
          const activeGoalIndex = findActiveGoalIndex(currentGoals);

          if (activeGoalIndex !== -1) {
            const currentGoal = currentGoals[activeGoalIndex];
            currentGoals[activeGoalIndex] = {
              ...currentGoal,
              ...(newGoal !== undefined && { goal: newGoal }),
              ...(newTargetAmount !== undefined && {
                targetAmount: newTargetAmount,
              }),
              savings: [
                ...(currentGoal.savings || []),
                ...(saving ? [saving] : []),
              ],
            };
          }
          return { allGoals: currentGoals };
        });
      },

      completeGoal: () => {
        set(state => {
          const currentGoals = [...state.allGoals];
          const activeGoalIndex = findActiveGoalIndex(currentGoals);

          if (activeGoalIndex !== -1) {
            const currentGoal = currentGoals[activeGoalIndex];

            // Oblicz sumę wszystkich oszczędności
            const totalPromotionSum =
              currentGoal.savings?.reduce((sum, saving) => {
                return sum + (saving.promotion || 0);
              }, 0) || 0;

            // Znajdź datę ostatniej oszczędności (najnowszą datę)
            let lastSavingDate = new Date().toISOString().split('T')[0]; // Domyślnie obecna data
            if (currentGoal.savings && currentGoal.savings.length > 0) {
              // Posortuj oszczędności według daty i weź ostatnią
              const sortedSavings = [...currentGoal.savings].sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              );
              lastSavingDate = sortedSavings[0].date;
            }

            // Dodaj datę osiągnięcia celu i sumę oszczędności
            currentGoals[activeGoalIndex] = {
              ...currentGoal,
              endDate: lastSavingDate, // Użyj daty ostatniej oszczędności
              totalPromotionSum: totalPromotionSum,
            };
          }
          return { allGoals: currentGoals };
        });
      },

      // Zwraca wszystkie oszczędności ze wszystkich celów
      getAllSavings: () => {
        const { allGoals } = get();
        const allSavings: Saving[] = [];

        allGoals.forEach(goal => {
          if (goal.savings) {
            allSavings.push(...goal.savings);
          }
        });

        return allSavings;
      },

      // Usuwa konkretną oszczędność z celu (tylko z aktywnego celu)
      deleteSaving: (savingId: number) => {
        set(state => {
          const currentGoals = [...state.allGoals];

          const activeGoalIndex = findActiveGoalIndex(currentGoals);

          if (activeGoalIndex !== -1) {
            const activeGoal = currentGoals[activeGoalIndex];
            if (activeGoal.savings) {
              activeGoal.savings = activeGoal.savings.filter(
                saving => saving.id !== savingId,
              );
            }
          }

          return { allGoals: currentGoals };
        });
      },

      // Sprawdza czy oszczędność należy do aktywnego celu
      isSavingFromActiveGoal: (savingId: number) => {
        const { allGoals } = get();
        const activeGoal = allGoals.find(goal => !goal.endDate);

        if (activeGoal && activeGoal.savings) {
          return activeGoal.savings.some(saving => saving.id === savingId);
        }

        return false;
      },

      // Sprawdza czy oszczędność jest ostatnio dodaną w aktywnym celu
      isLatestSavingFromActiveGoal: (savingId: number) => {
        const { allGoals } = get();
        const activeGoal = allGoals.find(goal => !goal.endDate);

        if (activeGoal && activeGoal.savings && activeGoal.savings.length > 0) {
          // Znajdź oszczędność z najwyższym ID (ostatnio dodaną)
          const latestSaving = activeGoal.savings.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          });

          return latestSaving.id === savingId;
        }

        return false;
      },

      todayDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    }),
    {
      name: GOAL_KEY,
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: state => ({
        allGoals: state.allGoals,
      }),
      onRehydrateStorage: () => state => {
        if (state && state.allGoals) {
          // Konwersja dat z powrotem na obiekty Date jeśli są przechowywane jako stringi
          state.allGoals = state.allGoals.map((goal: Goal) => ({
            ...goal,
            startDate:
              typeof goal.startDate === 'string'
                ? goal.startDate
                : new Date(goal.startDate).toISOString(),
          }));
        }
      },
    },
  ),
);

export default useSavingsStore;
