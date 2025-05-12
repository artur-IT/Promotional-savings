import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Top from "@/components/Top";
import DataSavings from "@/components/AddSaving/DataSavings";
import Button from "@/components/Button";
import { router } from "expo-router";
import { storage } from "@/utils/storage";
import { Saving } from "@/constans/dataTypes";
import { clearAllSavings } from "@/store/savingsStore";

export default function AddSaving() {
  const [savingData, setSavingData] = useState<{
    promotional: number;
    date: string;
    category: string;
  }>({
    promotional: 0,
    date: "",
    category: "",
  });

  // Referencja do komponentu DataSavings, aby móc wywołać jego metodę resetForm
  const dataSavingsRef = useRef<{ resetForm: () => void }>(null);

  const handleDataChange = (data: { promotional: number; date: string; category: string }) => {
    setSavingData(data);
  };

  const CancelHandle = () => {
    router.push("/");
  };

  const SaveHandle = () => {
    // Walidacja danych
    if (savingData.promotional <= 0) {
      Alert.alert("Błąd", "Kwota musi być większa od zera");
      return;
    }

    if (!savingData.date) {
      Alert.alert("Błąd", "Wybierz datę");
      return;
    }

    if (!savingData.category) {
      Alert.alert("Błąd", "Wybierz kategorię");
      return;
    }

    try {
      // Tworzenie nowego obiektu oszczędności
      const newSaving: Saving = {
        id: uuidv4().substring(0, 4),
        promotional: savingData.promotional,
        date: savingData.date,
        category: savingData.category,
      };

      // Pobieranie istniejących oszczędności
      const existingSavingsJson = storage.getString("savings");
      const existingSavings: Saving[] = existingSavingsJson ? JSON.parse(existingSavingsJson) : [];

      // Dodawanie nowej oszczędności
      const updatedSavings = [...existingSavings, newSaving];

      // Zapisywanie do MMKV
      storage.set("savings", JSON.stringify(updatedSavings));

      // Resetowanie formularza
      if (dataSavingsRef.current) {
        dataSavingsRef.current.resetForm();
      }

      // Resetowanie stanu w komponencie nadrzędnym
      setSavingData({
        promotional: 0,
        date: "",
        category: "",
      });

      Alert.alert("Sukces", "Oszczędność została zapisana", [{ text: "OK", onPress: () => router.push("/") }]);
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
      Alert.alert("Błąd", "Nie udało się zapisać oszczędności. Spróbuj ponownie.");
    }
    checkSavedData();
  };

  // Dodaj tę funkcję w komponencie AddSaving
  const checkSavedData = () => {
    const savedData = storage.getString("savings");
    console.log("Zapisane dane:", savedData);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("Liczba zapisanych oszczędności:", parsedData.length);
    } else {
      console.log("Brak zapisanych danych");
    }
  };

  return (
    <View>
      <Top />
      <Text style={styles.title}>
        Dzisiaj <br />
        zaoszczędziłem
      </Text>
      <DataSavings ref={dataSavingsRef} onDataChange={handleDataChange} />
      <View style={styles.buttons}>
        <Button title="Zapisz" onPress={SaveHandle} />
        <Button title="Anuluj" onPress={CancelHandle} />
        <Button title="CLEAR" width={60} onPress={clearAllSavings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 20,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
  },
});
