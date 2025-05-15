import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { router } from "expo-router";
import colors from "@/constans/colors";
import { addGoal, getAllGoals } from "@/store/goalsStore";
import { useState } from "react";

export default function EditTargetForm({ onFormClose }: { onFormClose: () => void }) {
  const goal = getAllGoals();
  const bigName = goal[0]?.goal || "";
  const goalAmount = goal[0]?.targetAmount || "0";

  const [goalName, setGoalName] = useState(bigName);
  const [targetAmount, setTargetAmount] = useState(goalAmount);

  const [errors, setErrors] = useState<{
    goalName?: string;
    goalValue?: string;
  }>({});

  const cancelHandle = () => {
    router.push("/");
  };

  const saveHandle = () => {
    const newErrors: {
      goalName?: string;
      goalValue?: string;
    } = {};
    let isValid = true;

    if (!goalName.trim()) {
      newErrors.goalName = "Podaj cel ozczędzania";
      isValid = false;
    }

    if (!`${targetAmount}`.trim()) {
      newErrors.goalValue = "Kwota celu nie może być pusta";
      isValid = false;
    } else {
      const amount = parseFloat(`${targetAmount}`);
      if (isNaN(amount) || amount <= 0) {
        newErrors.goalValue = "Kwota musi być liczbą większą od zera";
        isValid = false;
      }
    }
    setErrors(newErrors);

    if (isValid) {
      addGoal({
        goal: goalName,
        targetAmount: parseFloat(`${targetAmount}`),
      });
      Alert.alert("Sukces", "Cel został dodany pomyślnie", [{ text: "OK", onPress: () => router.push("/") }]);
      onFormClose();
    } else {
      const errorMessage = newErrors.goalName || newErrors.goalValue;
      if (errorMessage) {
        Alert.alert("Błąd", errorMessage);
      }
    }
  };

  // Funkcje do czyszczenia błędów po kliknięciu w pole
  const handleGoalNameFocus = () => {
    setErrors((prev) => ({ ...prev, goalName: undefined }));
  };

  const handleTargetAmountFocus = () => {
    setErrors((prev) => ({ ...prev, goalValue: undefined }));
  };

  const clearGoalName = () => setGoalName("");
  const clearTargetAmount = () => setTargetAmount("");

  return (
    <View style={styles.container}>
      {/* Target Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Cel</Text>
        <TextInput
          style={errors.goalName ? styles.errorBg : styles.targetInput}
          value={goalName}
          onChangeText={setGoalName}
          onFocus={handleGoalNameFocus}
          placeholder={`${errors.goalName ? errors.goalName : "Nazwa celu"}`}
        />
        <AntDesign name="delete" size={20} color="white" style={styles.deleteIcon} onPress={clearGoalName} />
      </View>

      {/* Target Value */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput
          style={[errors.goalValue ? styles.errorBg : styles.targetInput, styles.targetInputValue]}
          keyboardType="numeric"
          value={`${targetAmount}`}
          onChangeText={setTargetAmount}
          onFocus={handleTargetAmountFocus}
          // placeholder={`${errors.goalValue ? errors.goalValue : "0.00"}`}
        />
        <AntDesign name="delete" size={20} color="white" style={styles.deleteIcon} onPress={clearTargetAmount} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button title="Zapisz" onPress={saveHandle} />
        <Button title="Anuluj" onPress={cancelHandle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 15,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    padding: 16,
    height: 200,
    backgroundColor: colors.background.card,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 50,
    fontSize: 16,
    color: colors.text.button_W,
  },
  targetInput: {
    width: 170,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  targetInputValue: {
    width: 70,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteIcon: {
    marginLeft: 5,
  },
  errorBg: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: "yellow",
  },
});
