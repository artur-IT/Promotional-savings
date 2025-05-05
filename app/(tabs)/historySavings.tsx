import HistorySavings from "@/screens/HistorySavings/HistorySavings";
import { View, Text, StyleSheet } from "react-native";

export default function HistorySavingsScreen() {
  return (
    <View style={styles.container}>
      <HistorySavings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
