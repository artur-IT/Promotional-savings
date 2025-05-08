import { StyleSheet, Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function EditTargetForm() {
  const CancelHandle = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      {/* Target Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Cel</Text>
        <TextInput style={styles.targetInput} />
        <AntDesign name="delete" size={20} color="black" style={styles.deleteIcon} />
      </View>

      {/* Target Value */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput style={[styles.targetInput, styles.targetInputValue]} keyboardType="numeric" />
        <AntDesign name="delete" size={20} color="black" style={styles.deleteIcon} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button title="Zapisz" onPress={() => console.log("Zapisano cel")} />
        <Button title="Anuluj" onPress={CancelHandle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    padding: 16,
    height: 200,
    backgroundColor: "limegreen",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 50,
    fontSize: 16,
  },

  targetInput: {
    width: 170,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  targetInputValue: {
    width: 70,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteIcon: {
    marginLeft: 5,
  },
});
