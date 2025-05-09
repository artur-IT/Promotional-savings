import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface SavingRecord {
  id: string;
  date: Date;
  amount: number;
}

export default function HistoryCalendar() {
  const [savingsHistory, setSavingsHistory] = useState<SavingRecord[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const mockData: SavingRecord[] = [
      { id: "1", date: new Date(2023, 0, 5), amount: 100 },
      { id: "2", date: new Date(2023, 0, 15), amount: 50 },
      { id: "3", date: new Date(2023, 1, 3), amount: 200 },
      { id: "4", date: new Date(2023, 1, 20), amount: 75 },
      { id: "5", date: new Date(2023, 2, 10), amount: 150 },
      { id: "6", date: new Date(2023, 3, 5), amount: 120 },
      { id: "7", date: new Date(2023, 4, 12), amount: 90 },
      { id: "8", date: new Date(2023, 5, 8), amount: 180 },
    ];

    const sortedData = mockData.sort((a, b) => b.date.getTime() - a.date.getTime());
    setSavingsHistory(sortedData);

    // Domyślnie rozwijamy pierwszy miesiąc
    // if (sortedData.length > 0) {
    //   const firstMonthKey = format(sortedData[0].date, "LLLL", { locale: pl });
    //   const capitalizedMonth = firstMonthKey.charAt(0).toUpperCase() + firstMonthKey.slice(1);
    //   setExpandedMonths({ [capitalizedMonth]: true });
    // }
  }, []);

  const groupByMonth = () => {
    const grouped: { [key: string]: SavingRecord[] } = {};

    savingsHistory.forEach((record) => {
      // Używam formatu LLLL dla nazwy miesiąca w mianowniku
      const monthKey = format(record.date, "LLLL", { locale: pl });
      const capitalizedMonth = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);

      if (!grouped[capitalizedMonth]) {
        grouped[capitalizedMonth] = [];
      }

      grouped[capitalizedMonth].push(record);
    });

    return grouped;
  };

  const calculateMonthTotal = (records: SavingRecord[]) => {
    return records.reduce((sum, record) => sum + record.amount, 0).toFixed(2);
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const groupedData = groupByMonth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2025</Text>

      <View style={styles.header}>
        <Text style={[styles.headerText, styles.flex1]}>Data</Text>
        <Text style={[styles.headerText, styles.flex1, styles.textRight]}>Kwota (PLN)</Text>
      </View>

      <ScrollView>
        {Object.entries(groupedData).map(([month, records], monthIndex) => (
          <View key={month}>
            <TouchableOpacity style={styles.monthHeader} onPress={() => toggleMonth(month)} activeOpacity={0.7}>
              <Text style={styles.monthTitle}>
                {month} {expandedMonths[month] ? "▼" : "▶"}
              </Text>

              {/* Wyświetlanie sumy kwot dla zwiniętego miesiąca */}
              {!expandedMonths[month] && <Text style={styles.monthTotalAmount}>{calculateMonthTotal(records)} PLN</Text>}
            </TouchableOpacity>

            {expandedMonths[month] && (
              <View>
                {records.map((record, index) => (
                  <View key={record.id} style={[styles.recordRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                    <Text style={[styles.recordText, styles.flex1]}>{format(record.date, "dd.MM.yyyy")}</Text>
                    <Text style={[styles.amountText, styles.flex1, styles.textRight]}>{record.amount.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Suma oszczędności:{" "}
          <Text style={styles.totalAmount}>{savingsHistory.reduce((sum, record) => sum + record.amount, 0).toFixed(2)} PLN</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "left",
    color: "#2563eb", // blue-600
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#dbeafe",
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 4,
  },
  headerText: {
    fontWeight: "600",
    color: "#1e40af", // blue-800
  },
  monthHeader: {
    backgroundColor: "#eff6ff", // blue-50
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6", // blue-500
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthTitle: {
    fontWeight: "bold",
    color: "#1d4ed8", // blue-700
  },
  monthTotalAmount: {
    fontWeight: "500",
    color: "#059669", // green-600
  },
  recordRow: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
  },
  evenRow: {
    backgroundColor: "#f9fafb", // gray-50
  },
  oddRow: {
    backgroundColor: "white",
  },
  recordText: {
    color: "#374151", // gray-700
  },
  amountText: {
    fontWeight: "500",
    color: "#059669", // green-600
  },
  footer: {
    marginTop: 16,
    backgroundColor: "#f3f4f6", // gray-100
    padding: 12,
    borderRadius: 8,
  },
  footerText: {
    textAlign: "center",
    color: "#374151", // gray-700
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#059669", // green-600
  },
  flex1: {
    flex: 1,
  },
  textRight: {
    textAlign: "right",
  },
});
