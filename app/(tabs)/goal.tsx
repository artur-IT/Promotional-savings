import { View, Text, StyleSheet } from "react-native";

export default function GoalScreen() {
  return (
    <View style={styles.container}>
      <Text>Cel Screen</Text>
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
