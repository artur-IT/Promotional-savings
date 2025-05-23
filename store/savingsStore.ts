import { MMKV } from "react-native-mmkv";
import { SAVINGS_KEY } from "@/constants/dataTypes";
import { Alert } from "react-native";

const storage = new MMKV({
  id: "savings-app-storage",
});

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
