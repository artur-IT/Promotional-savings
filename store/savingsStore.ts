import { MMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";
import { Saving, SAVINGS_KEY } from "@/constans/dataTypes";

const storage = new MMKV({
  id: "savings-app-storage",
});

export const getAllSavings = (): Saving[] => {
  const savingsJson = storage.getString(SAVINGS_KEY);
  return savingsJson ? JSON.parse(savingsJson) : [];
};

export const addSaving = (savingData: Saving): Saving => {
  const shortId = uuidv4().substring(0, 4);
  const existingSavings = getAllSavings() || [];

  const newSaving: Saving = {
    id: shortId,
    promotion: savingData.promotion,
    date: savingData.date,
    category: savingData.category,
  };

  const isIdUnique = !existingSavings.some((saving) => saving.id === shortId);

  // Jeśli ID nie jest unikalne, generujemy nowe
  if (!isIdUnique) {
    return addSaving(savingData);
  }

  // Dodawanie nowej oszczędności do istniejących
  const updatedSavings = [...existingSavings, newSaving];

  storage.set(SAVINGS_KEY, JSON.stringify(updatedSavings));

  return newSaving;
};

export const deleteSaving = (id: string): boolean => {
  const existingSavings = getAllSavings();
  const filteredSavings = existingSavings.filter((saving) => saving.id !== id);

  if (filteredSavings.length === existingSavings.length) {
    return false; // Nic nie usunięto
  }

  storage.set(SAVINGS_KEY, JSON.stringify(filteredSavings));
  return true;
};

export const clearAllSavings = (): void => {
  storage.delete(SAVINGS_KEY);
};

// Eksport instancji storage dla innych potrzeb
export { storage };
