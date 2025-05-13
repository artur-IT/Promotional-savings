import { MMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";
import { Saving, SAVINGS_KEY } from "@/constans/dataTypes";
import { Alert } from "react-native";

const storage = new MMKV({
  id: "savings-app-storage",
});

export const getAllSavings = (): Saving[] => {
  try {
    const savingsJson = storage.getString(SAVINGS_KEY);

    return savingsJson ? JSON.parse(savingsJson) : [];
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    return [];
  }
};

export const addSaving = (savingData: Saving): Saving => {
  try {
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
  } catch (error) {
    console.error("Błąd podczas dodawania oszczędności:", error);
    throw error; // Rzucamy błąd, aby obsłużyć go w komponencie
  }
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

export const clearAllSavings = () => {
  try {
    storage.delete(SAVINGS_KEY);
  } catch (error) {
    console.error("Błąd podczas czyszczenia danych:", error);
    Alert.alert("Błąd", "Nie udało się wyczyścić danych. Spróbuj ponownie.");
  }
};

// Eksport instancji storage dla innych potrzeb
export { storage };
