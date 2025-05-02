import { StyleSheet } from "react-native";

export default function GoalProgress() {
  return <div style={styles.container}>Postęp celu (z components)</div>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
