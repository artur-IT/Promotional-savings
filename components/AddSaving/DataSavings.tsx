import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: ["Sty.", "Lut.", "Mar.", "Kwi.", "Maj", "Cze.", "Lip.", "Sie.", "Wrz.", "Paź.", "Lis.", "Gru."],
  dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
  dayNamesShort: ["Ndz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
  today: "Dziś",
};
LocaleConfig.defaultLocale = "pl";

export default function DataSavings() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };
  // Funkcja formatująca datę z YYYY-MM-DD na DD.MM.YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "Wybierz datę";

    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      {/* Wiersz 1 */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput style={styles.input} keyboardType="numeric" />
      </View>

      {/* Wiersz 2 */}
      <View style={styles.row}>
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
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

      {/* Modal z kalendarzem */}
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "#3498db" },
              }}
              theme={{
                todayTextColor: "#3498db",
                selectedDayBackgroundColor: "#3498db",
                arrowColor: "#3498db",
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  dateText: {
    fontSize: 14,
    lineHeight: 30,
  },
  input: {
    width: 130,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  picker: {
    width: 130,
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
