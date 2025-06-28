import { Image, StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { getAllGoals } from "@/store/goalsStore";
import useSavingsStore from "@/store/useSavingsStore_Zustand";

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

  const totalPromotionSum = allSavings && allSavings.length > 0 ? allSavings.reduce((sum, saving) => sum + (saving.promotion || 0), 0) : 0;

  const bigName = goal[0]?.goal || "Cel";
  const goalAmount = goal[0]?.targetAmount || 0;

  const progressPercent = goalAmount > 0 ? (totalPromotionSum / goalAmount) * 100 : 0;
  const progressRatio = goalAmount > 0 ? totalPromotionSum / goalAmount : 0;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>Zbieram na</Text>
        <Text style={styles.descriptionTitle}>{bigName.toLocaleUpperCase()}</Text>
      </View>
      <View style={styles.progressSection}>
        <View style={styles.progressTargetContainer}>
          <Text style={[styles.progressSum, totalPromotionSum > goalAmount ? styles.successValue : null]}>{totalPromotionSum} zł</Text>
          <Text style={styles.progressTarget}>{goalAmount} zł</Text>
        </View>

        <ProgressBar progress={progressRatio} width={260} height={12} color={"green"} animated={true} unfilledColor={"lightgreen"} />
        <Text style={styles.progressPercent}>{Number.isInteger(progressPercent) ? progressPercent : progressPercent.toFixed(1)} %</Text>
      </View>
      {totalPromotionSum >= goalAmount && (
        <View style={styles.successContainer}>
          <Image source={require("@/assets/images/sun_new.gif")} style={styles.happy} />
          <Text style={styles.success}>BRAWO TY! </Text>
          <Text style={styles.success}> Cel osiągnięty </Text>
        </View>
      )}
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
  progressTargetContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressSum: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 10,
    marginBottom: 10,
  },
  progressTarget: {
    alignSelf: "flex-end",
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
  noDataText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  successContainer: {
    position: "absolute",
    top: 200,
    display: "flex",
    alignItems: "center",
  },
  happy: {
    width: 150,
    height: 150,
  },
  success: {
    textAlign: "center",
    fontSize: 30,
  },
  successValue: {
    fontSize: 30,
    color: "green",
    fontWeight: "bold",
  },
});
