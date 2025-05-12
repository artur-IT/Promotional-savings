import { MMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";
import { CurrentGoal } from "@/constans/dataTypes";
import { storage } from "@/utils/storage";

// Klucz do przechowywania celów
const GOALS_KEY = "goals";

// Interfejs dla danych wejściowych
export interface GoalInput {
  goal: string;
  targetAmount: number;
}

// Pobieranie wszystkich celów
export const getAllGoals = (): CurrentGoal[] => {
  const goalsJson = storage.getString(GOALS_KEY);
  return goalsJson ? JSON.parse(goalsJson) : [];
};

// Dodawanie nowego celu
export const addGoal = (goalData: GoalInput): CurrentGoal => {
  const shortId = uuidv4().substring(0, 4);
  const currentDate = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  // Tworzenie nowego obiektu celu
  const newGoal: CurrentGoal = {
    id: shortId,
    goal: goalData.goal,
    targetAmount: goalData.targetAmount,
    startDate: currentDate,
    endDate: undefined, // Będzie ustawione po osiągnięciu celu
  };

  // Pobieranie istniejących celów
  const existingGoals = getAllGoals();

  const isIdUnique = !existingGoals.some((goal) => goal.id === shortId);

  // Jeśli ID nie jest unikalne, generujemy nowe
  if (!isIdUnique) {
    return addGoal(goalData); // Rekurencyjne wywołanie z tymi samymi danymi
  }

  // Dodawanie nowego celu
  const updatedGoals = [...existingGoals, newGoal];

  // Zapisywanie do MMKV
  storage.set(GOALS_KEY, JSON.stringify(updatedGoals));

  return newGoal;
};

// Usuwanie celu
export const deleteGoal = (id: string): boolean => {
  const existingGoals = getAllGoals();
  const filteredGoals = existingGoals.filter((goal) => goal.id !== id);

  if (filteredGoals.length === existingGoals.length) {
    return false; // Nic nie usunięto
  }

  storage.set(GOALS_KEY, JSON.stringify(filteredGoals));
  return true;
};

// Aktualizacja kwoty bieżącej celu
// export const updateGoalAmount = (id: string, amount: number): CurrentGoal | null => {
//   const existingGoals = getAllGoals();
//   const goalIndex = existingGoals.findIndex((goal) => goal.id === id);

//   if (goalIndex === -1) {
//     return null; // Cel nie istnieje
//   }

//   const updatedGoal = {
//     ...existingGoals[goalIndex],
//     currentAmount: {promotionalValue: amount},
//   };

//   // Jeśli osiągnięto lub przekroczono cel, ustawiamy datę końcową
//   if (amount >= updatedGoal.targetAmount && !updatedGoal.endDate) {
//     updatedGoal.endDate = new Date().toISOString().split("T")[0];
//   }

//   const updatedGoals = [...existingGoals];
//   updatedGoals[goalIndex] = updatedGoal;

//   storage.set(GOALS_KEY, JSON.stringify(updatedGoals));
//   return updatedGoal;
// };

// Czyszczenie wszystkich celów (przydatne do testów)
export const clearAllGoals = (): void => {
  storage.delete(GOALS_KEY);
};
