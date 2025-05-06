import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default function GoalProgress() {
  return (
    <View style={styles.container}>
      <View style={styles.numbers}>
        <Text style={styles.progressNumbers}>17,8 %</Text>
        <Text style={styles.progressNumbers}>1000 zł</Text>
      </View>
      <ProgressBar progress={0.25} width={260} height={12} color={"green"} />
      <Text style={styles.description}>Zbieram i beztrosko wydam je na</Text>
      <Text style={styles.goal}>Wakacje</Text>
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
});
