import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { getAllGoals } from "@/store/goalsStore";
import { getAllSavings } from "@/store/savingsStore";

export default function GoalProgress() {
  const goal = getAllGoals();

  const allSavings = getAllSavings();
  const totalPromotionSum = allSavings.reduce((sum, saving) => sum + saving.promotion, 0);

  const bigName = goal[0].goal;
  const goalAmount = goal[0].targetAmount;

  // Obliczanie procentu zebranej kwoty
  const progressPercent = (totalPromotionSum / goalAmount) * 100;
  const progressRatio = totalPromotionSum / goalAmount; // Wartość od 0 do 1 dla ProgressBar

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>Zbieram na</Text>
        <Text style={styles.descriptionTitle}>{bigName.toLocaleUpperCase()}</Text>
      </View>
      <View style={styles.progressSection}>
        <Text style={styles.progressTarget}>{goalAmount} zł</Text>
        <ProgressBar progress={progressRatio} width={260} height={12} color={"green"} animated={true} unfilledColor={"lightgreen"} />
        <Text style={styles.progressPercent}>{progressPercent.toFixed(1)} %</Text>
      </View>
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
  progressTarget: {
    alignSelf: "flex-start",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  progressPercent: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    width: 250,
    fontSize: 16,
    textAlign: "right",
    marginTop: 10,
  },
  descriptionTitle: { fontSize: 30, textAlign: "right" },
  goal: {
    width: 250,
    fontSize: 30,
    textAlign: "left",
  },
  progressSection: {
    width: 250,
    marginTop: 10,
    marginBottom: 10,
  },
});
