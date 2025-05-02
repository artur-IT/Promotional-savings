import { View, Text, StyleSheet } from "react-native";

export default function AddSaving() {
  return (
    <View style={styles.container}>
      <Text>Dodaj oszczędność</Text>
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
