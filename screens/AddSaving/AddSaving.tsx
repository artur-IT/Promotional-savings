import { View, Text, StyleSheet } from "react-native";
import Top from "@/components/Top";
import DataSavings from "@/components/AddSaving/DataSavings";

export default function AddSaving() {
  return (
    <View style={styles.container}>
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
  container: {
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 20,
  },
});
