import { StyleSheet } from "react-native";

export default function Goal() {
  return <div style={styles.container}>Cel (ze screens)</div>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
