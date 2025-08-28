import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LastAdd() {
  const [lastTwoSavings, setLastTwoSavings] = useState<number[]>([]);
  const { getAllGoals, allGoals } = useSavingsStore();

  useEffect(() => {
    try {
      const fetchLastSavings = () => {
        // Get all goals and collect all savings from them
        const allGoals = getAllGoals();
        const allSavingsFromGoals: { promotion: number; date: string }[] = [];

        // Collect all savings from all goals
        allGoals.forEach(goal => {
          if (goal.savings) {
            goal.savings.forEach(saving => {
              allSavingsFromGoals.push({
                promotion: saving.promotion,
                date: saving.date,
              });
            });
          }
        });

        // Sort by date (newest first)
        const sortedSavings = allSavingsFromGoals.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // Get last two savings
        const lastTwo = sortedSavings.slice(0, 2);
        const lastTwoPromotion = lastTwo.map(saving => saving.promotion);
        setLastTwoSavings(lastTwoPromotion);
      };

      fetchLastSavings();
    } catch (error) {
      console.error('Error during data initialization:', error);
      setLastTwoSavings([]);
    }
  }, [allGoals]);

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 95,
    backgroundColor: 'white',
  },
  savingItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  noData: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
});
