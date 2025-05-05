import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface SavingRecord {
  id: string;
  date: Date;
  amount: number;
}

export default function HistoryCalendar() {
  const [savingsHistory, setSavingsHistory] = useState<SavingRecord[]>([]);

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
  }, []);

  const groupByMonth = () => {
    const grouped: { [key: string]: SavingRecord[] } = {};

    savingsHistory.forEach((record) => {
      const monthKey = format(record.date, "MMMM yyyy", { locale: pl });

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }

      grouped[monthKey].push(record);
    });

    return grouped;
  };

  const groupedData = groupByMonth();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center text-blue-600">Historia oszczędności</Text>

      <View className="flex-row bg-blue-100 p-3 rounded-t-lg mb-1">
        <Text className="flex-1 font-semibold text-blue-800">Data</Text>
        <Text className="flex-1 font-semibold text-blue-800">Miesiąc</Text>
        <Text className="flex-1 font-semibold text-blue-800 text-right">Kwota (PLN)</Text>
      </View>

      <ScrollView className="flex-1">
        {Object.entries(groupedData).map(([month, records], monthIndex) => (
          <View key={month} className="mb-4">
            <View className="bg-blue-50 py-2 px-3 border-l-4 border-blue-500">
              <Text className="font-bold text-blue-700">{month}</Text>
            </View>

            {records.map((record, index) => (
              <View key={record.id} className={`flex-row p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-200`}>
                <Text className="flex-1 text-gray-700">{format(record.date, "dd.MM.yyyy")}</Text>
                <Text className="flex-1 text-gray-700">{format(record.date, "MMMM", { locale: pl })}</Text>
                <Text className="flex-1 text-right font-medium text-green-600">{record.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View className="mt-4 bg-gray-100 p-3 rounded-lg">
        <Text className="text-center text-gray-700">
          Suma oszczędności:{" "}
          <Text className="font-bold text-green-600">{savingsHistory.reduce((sum, record) => sum + record.amount, 0).toFixed(2)} PLN</Text>
        </Text>
      </View>
    </View>
  );
}
