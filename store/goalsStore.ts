import { v4 as uuidv4 } from "uuid";
import { Goal } from "@/constants/dataTypes";
import { storage } from "@/utils/storage";
import { GOAL_KEY } from "@/constants/dataTypes";

export interface GoalInput {
  goal: string;
  targetAmount: number;
}

// Pobieranie wszystkich celów
export const getAllGoals = (): Goal[] => {
  const goalsJson = storage.getString(GOAL_KEY);
  return goalsJson ? JSON.parse(goalsJson) : [];
};

// Dodawanie nowego celu
export const addGoal = (goalData: GoalInput): Goal => {
  const shortId = uuidv4().substring(0, 4);
  const currentDate = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  const newGoal: Goal = {
    id: shortId,
    goal: goalData.goal,
    targetAmount: goalData.targetAmount,
    startDate: currentDate,
    endDate: undefined, // Będzie ustawione po osiągnięciu celu
  };

  const updatedGoals = [newGoal];

  storage.set(GOAL_KEY, JSON.stringify(updatedGoals));

  return newGoal;
};

export const deleteGoal = (id: string): boolean => {
  const existingGoals = getAllGoals();
  const filteredGoals = existingGoals.filter((goal) => goal.id !== id);

  if (filteredGoals.length === existingGoals.length) {
    return false; // Nic nie usunięto
  }

  storage.set(GOAL_KEY, JSON.stringify(filteredGoals));
  return true;
};

// Czyszczenie wszystkich celów (przydatne do testów)
export const clearAllGoals = (): void => {
  storage.delete(GOAL_KEY);
};
