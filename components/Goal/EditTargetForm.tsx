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

  const cancelHandle = () => {
    router.push("/");
  };

  const saveHandle = () => {
    if (!goalName.trim()) {
      Alert.alert("Błąd", "Nazwa celu nie może być pusta");
      return;
    }

    if (!`${targetAmount}`.trim()) {
      Alert.alert("Błąd", "Kwota celu nie może być pusta");
      return;
    }
    const amount = parseFloat(`${targetAmount}`);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Błąd", "Kwota musi być liczbą większą od zera");
      return;
    }

    addGoal({
      goal: goalName,
      targetAmount: amount,
    });
    Alert.alert("Sukces", "Cel został dodany pomyślnie", [{ text: "OK", onPress: () => router.push("/") }]);
    onFormClose();
  };

  const clearGoalName = () => setGoalName("");
  const clearTargetAmount = () => setTargetAmount("");

  return (
    <View style={styles.container}>
      {/* Target Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Cel</Text>
        <TextInput style={styles.targetInput} value={goalName} onChangeText={setGoalName} placeholder="Nazwa celu" />
        <AntDesign name="delete" size={20} color="white" style={styles.deleteIcon} onPress={clearGoalName} />
      </View>

      {/* Target Value */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput
          style={[styles.targetInput, styles.targetInputValue]}
          keyboardType="numeric"
          value={`${targetAmount}`}
          onChangeText={setTargetAmount}
          // placeholder="0.00"
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
    // position: "relative",
    bottom: 15,
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
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
});
