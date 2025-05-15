import { getAllGoals } from "@/store/goalsStore";
import useSavingsStore from "@/store/useSavingsStore_Zustand";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default function GoalProgress() {
  const goal = getAllGoals();
  const { allSavings } = useSavingsStore();

  if (!goal || goal.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Brak zdefiniowanych celów</Text>
      </View>
    );
  }
  // Bezpieczne pobieranie danych
  const totalPromotionSum = allSavings && allSavings.length > 0 ? allSavings.reduce((sum, saving) => sum + (saving.promotion || 0), 0) : 0;

  const bigName = goal[0]?.goal || "Cel";
  const goalAmount = goal[0]?.targetAmount || 0;

  // Zabezpieczenie przed dzieleniem przez zero
  const progressPercent = goalAmount > 0 ? (totalPromotionSum / goalAmount) * 100 : 0;
  const progressRatio = goalAmount > 0 ? totalPromotionSum / goalAmount : 0;

  return (
    <View style={styles.container}>
      <View style={styles.numbers}>
        <Text style={[styles.progressNumbers, totalPromotionSum > goalAmount ? styles.success : null]}>
          {progressPercent % 1 === 0 ? progressPercent : progressPercent.toFixed(1)} %
        </Text>
        {totalPromotionSum > goalAmount ? <Image source={require("@/assets/images/sun_new.gif")} style={styles.happy} /> : null}

        <Text style={styles.progressNumbers}>{goalAmount} zł</Text>
      </View>
      <ProgressBar progress={progressRatio} width={260} height={12} color={"green"} animated={true} unfilledColor={"lightgreen"} />
      <Text style={styles.description}>Zbieram i beztrosko wydam je na</Text>
      <Text style={styles.goal}>{bigName.toLocaleUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  numbers: {
    width: 400,
    marginBottom: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  progressNumbers: {
    fontSize: 18,
    alignSelf: "flex-end",
  },
  description: {
    width: 250,
    fontSize: 16,
    textAlign: "left",
    marginTop: 10,
  },
  goal: {
    width: 250,
    fontSize: 30,
    textAlign: "left",
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  happy: {
    position: "absolute",
    top: -20,
    width: 50,
    height: 50,
  },
  success: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
  },
});
