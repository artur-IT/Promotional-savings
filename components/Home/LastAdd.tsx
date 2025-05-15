import useSavingsStore from "@/store/useSavingsStore_Zustand";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LastAdd() {
  const [lastTwoSavings, setLastTwoSavings] = useState<number[]>([]);
  const { allSavings } = useSavingsStore();

  useEffect(() => {
    try {
      const fetchLastSavings = () => {
        const sortedSavings = [...allSavings].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        const lastTwo = sortedSavings.slice(0, 2);
        const lastTwoPromotion = lastTwo.map((saving) => saving.promotion);
        setLastTwoSavings(lastTwoPromotion);
      };

      fetchLastSavings();
    } catch (error) {
      console.error("Błąd podczas inicjalizacji danych:", error);
      setLastTwoSavings([]);
    }
  }, [allSavings]);

  return (
    <View style={styles.section}>
      <Text>Ostatnio:</Text>
      {lastTwoSavings.length > 0 ? (
        lastTwoSavings.map((saving, index) => (
          <Text key={index} style={styles.savingItem}>
            +{saving} zł
          </Text>
        ))
      ) : (
        <Text style={styles.noData}>Brak danych</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 95,
  },
  savingItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  noData: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#888",
  },
});
