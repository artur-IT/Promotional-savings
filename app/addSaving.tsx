import { View, Text, StyleSheet } from "react-native";
import AddSaving from "../screens/AddSaving/AddSaving";

export default function addSaving() {
  return (
    // <View style={styles.container}>
    <AddSaving />

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
