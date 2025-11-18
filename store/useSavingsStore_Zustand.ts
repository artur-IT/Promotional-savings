import { storage } from '../utils/storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Goal, GOAL_KEY } from '../constants/dataTypes';

// Type for individual saving from Goal interface
type Saving = NonNullable<Goal['savings']>[0];

// Adapter for AsyncStorage to use with Zustand persist
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
        // Returns only active goal (without endDate)
        const activeGoals = allGoals.filter(goal => !goal.endDate);
        return activeGoals.length > 0
          ? activeGoals[activeGoals.length - 1]
          : null;
      },

      getLastGoal: () => {
        const { allGoals } = get();
        // Returns last goal (active or completed)
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
        // Returns only completed goals (with endDate)
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

            // Calculate sum of all savings
            const totalPromotionSum =
              currentGoal.savings?.reduce((sum, saving) => {
                return sum + (saving.promotion || 0);
              }, 0) || 0;

            // Find date of last saving (newest date)
            let lastSavingDate = new Date().toISOString().split('T')[0]; // Default to current date
            if (currentGoal.savings && currentGoal.savings.length > 0) {
              // Sort savings by date and take the last one
              const sortedSavings = [...currentGoal.savings].sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              );
              lastSavingDate = sortedSavings[0].date;
            }

            // Add goal achievement date and savings sum
            currentGoals[activeGoalIndex] = {
              ...currentGoal,
              endDate: lastSavingDate, // Use date of last saving
              totalPromotionSum: totalPromotionSum,
            };
          }
          return { allGoals: currentGoals };
        });
      },

      // Returns all savings from all goals
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

      // Removes specific saving from goal (only from active goal)
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

      // Checks if saving belongs to active goal
      isSavingFromActiveGoal: (savingId: number) => {
        const { allGoals } = get();
        const activeGoal = allGoals.find(goal => !goal.endDate);

        if (activeGoal && activeGoal.savings) {
          return activeGoal.savings.some(saving => saving.id === savingId);
        }

        return false;
      },

      // Checks if saving is the latest added in active goal
      isLatestSavingFromActiveGoal: (savingId: number) => {
        const { allGoals } = get();
        const activeGoal = allGoals.find(goal => !goal.endDate);

        if (activeGoal && activeGoal.savings && activeGoal.savings.length > 0) {
          // Find saving with highest ID (latest added)
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
          // Convert dates back to Date objects if stored as strings
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
