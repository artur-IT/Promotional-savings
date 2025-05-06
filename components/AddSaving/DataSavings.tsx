import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function DataSavings() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <View style={styles.container}>
      {/* Wiersz 1 */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="0.00" />
      </View>

      {/* Wiersz 2 */}
      <View style={styles.row}>
        <Text style={styles.label}>Data</Text>
        <TextInput style={styles.input} />
      </View>

      {/* Wiersz 3 */}
      <View style={styles.row}>
        <Text style={styles.label}>Kategoria</Text>
        <Picker style={styles.picker} selectedValue={selectedCategory} onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
          <Picker.Item label="Wybierz kategorię" value="" />
          <Picker.Item label="Żywność" value="food" />
          <Picker.Item label="Paliwo" value="fuel" />
          <Picker.Item label="Ubrania" value="clothes" />
          <Picker.Item label="Inne" value="another" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 90,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  input: {
    width: 150,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  picker: {
    width: 150,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
  },
});
