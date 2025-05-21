import HistoryCalendar from "@/components/HistorySaving/HistoryCalendar";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import Top from "@/components/Top";
import { useRef, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import useSavingsStore from "@/store/useSavingsStore_Zustand";

export default function HistorySavings() {
  const { allSavings } = useSavingsStore();
  const [selectYear, setSelectYear] = useState("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Zaczynamy od 1, aby kalendarz był widoczny

  useEffect(() => {
    if (allSavings && allSavings.length > 0) {
      // Wyciągnij lata z danych i usuń duplikaty
      const years = [
        ...new Set(
          allSavings.map((saving) => {
            // Zakładam, że data jest przechowywana w formacie string lub jako obiekt Date
            const date = new Date(saving.date);
            return date.getFullYear().toString();
          })
        ),
      ];

      // Sortowanie lat malejąco (od najnowszego)
      years.sort((a, b) => parseInt(b) - parseInt(a));

      setAvailableYears(years);
    }
  }, [allSavings]);

  const handleYearChange = (year: string) => {
    // Animacja przejścia
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectYear(year);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ScrollView>
      <Top />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Historia <br />
          oszczędności
        </Text>
        <View style={styles.buttonsContainer}>
          <Picker style={styles.picker} selectedValue={selectYear} onValueChange={(value) => handleYearChange(value)}>
            <Picker.Item label="Lata" value="" />
            {availableYears.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <HistoryCalendar selectedYear={selectYear} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 26,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
  },
  picker: {
    width: 80,
    height: 40,
    backgroundColor: "black",
    borderColor: "black",
    color: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
});
