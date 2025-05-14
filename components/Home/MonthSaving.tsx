import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllSavings } from "@/store/savingsStore";

export default function MonthSaving() {
  const allSavings = getAllSavings();

  const [currentMonthSavings, setCurrentMonthSavings] = useState(0);
  const [currentMonthName, setCurrentMonthName] = useState("");

  useEffect(() => {
    // Pobierz aktualny miesiąc
    const getCurrentMonthData = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Nazwy miesięcy po polsku
      const monthNames = [
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
      ];

      setCurrentMonthName(monthNames[currentMonth]);

      // Oblicz sumę oszczędności z bieżącego miesiąca
      let sum = 0;
      allSavings.forEach((saving) => {
        const savingDate = new Date(saving.date);
        if (savingDate.getMonth() === currentMonth && savingDate.getFullYear() === currentYear) {
          sum += saving.promotion;
        }
      });

      setCurrentMonthSavings(sum);
    };

    getCurrentMonthData();
  }, [allSavings]);

  return (
    <View style={styles.section}>
      <View style={styles.insideText}>
        <Text style={styles.monthValue}>+{currentMonthSavings} zł</Text>
        <Text style={styles.monthName}>{currentMonthName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
    height: 190,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 95,
    backgroundColor: "orange",
  },
  insideText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  monthValue: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    fontSize: 36,
  },
  monthName: {
    display: "flex",
    margin: 0,
    fontSize: 25,
    fontWeight: "bold",
  },
});
