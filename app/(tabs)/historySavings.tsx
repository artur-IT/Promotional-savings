import Header from "@/components/HistorySaving/Header";
import HistoryCalendar from "@/components/HistorySaving/HistoryCalendar";
import { View, Text, StyleSheet } from "react-native";

export default function HistorySavingsScreen() {
  return (
    <View style={styles.container}>
      <Text>HistorySavingsScreen</Text>
      <Header />
      <HistoryCalendar />
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
