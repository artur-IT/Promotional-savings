import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default function GoalProgress() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>Zbieram na</Text>
        <Text style={styles.descriptionTitle}>Wakacje</Text>
      </View>
      <View style={styles.progressSection}>
        <Text style={styles.progressTarget}>1000 zł</Text>
        <ProgressBar progress={0.25} width={260} height={12} color={"green"} animated={true} unfilledColor={"lightgreen"} />
        <Text style={styles.progressPercent}>17,8 %</Text>
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
