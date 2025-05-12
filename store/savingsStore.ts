import { MMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";
import { Saving } from "@/constans/dataTypes";

// Inicjalizacja magazynu MMKV
const storage = new MMKV({
  id: "savings-app-storage",
});

// Klucz do przechowywania oszczędności
const SAVINGS_KEY = "savings";

// Interfejs dla danych wejściowych
export interface SavingInput {
  promotional: number;
  date: string;
  category: string;
}

// Pobieranie wszystkich oszczędności
export const getAllSavings = (): Saving[] => {
  const savingsJson = storage.getString(SAVINGS_KEY);
  return savingsJson ? JSON.parse(savingsJson) : [];
};

// Dodawanie nowej oszczędności
export const addSaving = (savingData: SavingInput): Saving => {
  const shortId = uuidv4().substring(0, 4);

  // Tworzenie nowego obiektu oszczędności
  const newSaving: Saving = {
    id: shortId,
    promotional: savingData.promotional,
    date: savingData.date,
    category: savingData.category,
  };

  // Pobieranie istniejących oszczędności
  const existingSavings = getAllSavings();

  const isIdUnique = !existingSavings.some((saving) => saving.id === shortId);

  // Jeśli ID nie jest unikalne, generujemy nowe
  if (!isIdUnique) {
    return addSaving(savingData); // Rekurencyjne wywołanie z tymi samymi danymi
  }

  // Dodawanie nowej oszczędności
  const updatedSavings = [...existingSavings, newSaving];

  // Zapisywanie do MMKV
  storage.set(SAVINGS_KEY, JSON.stringify(updatedSavings));

  return newSaving;
};

// Usuwanie oszczędności
export const deleteSaving = (id: string): boolean => {
  const existingSavings = getAllSavings();
  const filteredSavings = existingSavings.filter((saving) => saving.id !== id);

  if (filteredSavings.length === existingSavings.length) {
    return false; // Nic nie usunięto
  }

  storage.set(SAVINGS_KEY, JSON.stringify(filteredSavings));
  return true;
};

// Czyszczenie wszystkich oszczędności (przydatne do testów)
export const clearAllSavings = (): void => {
  storage.delete(SAVINGS_KEY);
};

// Eksport instancji storage dla innych potrzeb
export { storage };
