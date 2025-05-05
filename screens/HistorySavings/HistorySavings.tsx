import Header from "@/components/HistorySaving/Header";
import HistoryCalendar from "@/components/HistorySaving/HistoryCalendar";
import { StyleSheet, View } from "react-native";

export default function HistorySavings() {
  return (
    <View style={styles.container}>
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
