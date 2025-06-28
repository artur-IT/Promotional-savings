import { View, Text, StyleSheet } from "react-native";
import Top from "@/components/Top";
import DataSavings from "@/components/AddSaving/DataSavings";

export default function AddSavingScreen() {
  return (
    <View>
      <Top />
      <Text style={styles.title}>
        Dzisiaj <br />
        zaoszczędziłem
      </Text>
      <DataSavings />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 20,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
  },
});
