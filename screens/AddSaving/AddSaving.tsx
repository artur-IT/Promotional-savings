import { View, Text, StyleSheet } from "react-native";
import Top from "@/components/Top";
import DataSavings from "@/components/AddSaving/DataSavings";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function AddSaving() {
  const CancelHandle = () => {
    router.push("/");
  };

  return (
    <View>
      <Top />
      <Text style={styles.title}>
        Dzisiaj <br />
        zaoszczędziłem
      </Text>
      <DataSavings />
      <View style={styles.buttons}>
        <Button title="Zapisz" onPress={() => console.log("Zapisano")} />
        <Button title="Anuluj" onPress={CancelHandle} />
      </View>
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
