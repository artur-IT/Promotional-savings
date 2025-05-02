import { StyleSheet } from "react-native";

export default function LastAdd() {
  return <div style={styles.container}>Ostatnio dodane (z components)</div>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
