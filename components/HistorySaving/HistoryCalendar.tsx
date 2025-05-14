import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getAllSavings } from "@/store/savingsStore";
import { Saving } from "@/constans/dataTypes";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HistoryCalendar() {
  const [savingsHistory, setSavingsHistory] = useState<Saving[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<{ [key: string]: boolean }>({});

  const history = getAllSavings();

  useEffect(() => {
    const sortedData = history.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    setSavingsHistory(sortedData);

    // Domyślnie rozwijamy pierwszy miesiąc
    if (sortedData.length > 0) {
      const firstMonthKey = format(sortedData[0].date, "LLLL", { locale: pl });
      const capitalizedMonth = firstMonthKey.charAt(0).toUpperCase() + firstMonthKey.slice(1);
      setExpandedMonths({ [capitalizedMonth]: true });
    }
  }, []);

  const groupByMonth = () => {
    const grouped: { [key: string]: Saving[] } = {};

    savingsHistory.forEach((record) => {
      // Format LLLL dla nazwy miesiąca w mianowniku
      const monthKey = format(record.date, "LLLL", { locale: pl });
      const capitalizedMonth = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);

      if (!grouped[capitalizedMonth]) {
        grouped[capitalizedMonth] = [];
      }

      grouped[capitalizedMonth].push(record);
    });

    return grouped;
  };

  const calculateMonthTotal = (records: Saving[]) => {
    return records.reduce((sum, record) => sum + record.promotion, 0).toFixed(2);
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
        <Text style={[styles.headerText, styles.flex1]}>Kategoria</Text>
        <Text style={[styles.headerText, styles.flex1, styles.textRight]}>Kwota (zł)</Text>
        <Text style={[styles.headerText, styles.flex1, styles.textRight]}>Usuń</Text>
      </View>

      <ScrollView>
        {Object.entries(groupedData).map(([month, records], monthIndex) => (
          <View key={month}>
            <TouchableOpacity style={styles.monthHeader} onPress={() => toggleMonth(month)} activeOpacity={0.7}>
              <Text style={styles.monthTitle}>
                {month} {expandedMonths[month] ? "▼" : "▶"}
              </Text>

              {/* Wyświetlanie sumy kwot dla zwiniętego miesiąca */}
              {!expandedMonths[month] && <Text style={styles.monthTotalAmount}>{calculateMonthTotal(records)} zł</Text>}
            </TouchableOpacity>

            {expandedMonths[month] && (
              <View>
                {records.map((record, index) => (
                  <View key={record.id} style={[styles.recordRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                    <Text style={[styles.recordText, styles.flex1]}>{format(record.date, "dd.MM.yyyy")}</Text>
                    <Text style={[styles.recordText, styles.flex1]}>{record.category}</Text>
                    <Text style={[styles.amountText, styles.flex1, styles.textRight]}>{record.promotion.toFixed(2)}</Text>
                    <Text style={[styles.icon]}>
                      <AntDesign name="delete" size={16} color="red" onPress={() => {}} />
                    </Text>
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
          <Text style={styles.totalAmount}>{savingsHistory.reduce((sum, record) => sum + record.promotion, 0).toFixed(2)} zł</Text>
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
  icon: {
    marginLeft: 10,
  },
});
