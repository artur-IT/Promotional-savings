import { View, Text, StyleSheet } from "react-native";
import AddSaving from "../screens/AddSaving/AddSaving";
import { Stack } from "expo-router";

export default function addSaving() {
  return (
    <AddSaving />
    // <Stack.Screen name="(tabs)" options={{ headerShown: false }} >
    //   </ Stack.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
