import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function YearSaving() {
  const { getAllGoals } = useSavingsStore();
  const [thisYearTotal, setThisYearTotal] = useState(0);
  const [thisYear, setThisYear] = useState(0);

  // Function to calculate the sum of deposits from this year
  const calculateThisYearSavings = () => {
    const currentYear = new Date().getFullYear(); // Get current year
    setThisYear(currentYear);
    let totalSavings = 0;

    // Go through each goal
    getAllGoals().forEach(goal => {
      // Check if goal has savings
      if (goal.savings) {
        // Go through each saving in the goal
        goal.savings.forEach(saving => {
          const savingDate = new Date(saving.date); // Create date object from text
          const savingYear = savingDate.getFullYear(); // Get year from date

          // Check if saving is from this year
          if (savingYear === currentYear) {
            totalSavings += saving.promotion;
          }
        });
      }
    });

    return totalSavings;
  };

  useEffect(() => {
    setThisYearTotal(calculateThisYearSavings());
  }, [thisYearTotal]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideText}>
          <Text style={styles.yearValue}>+{thisYearTotal} zł</Text>
          <Text style={styles.infoText}>Zaoszczędzone</Text>
          <Text style={styles.year}>{thisYear}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    borderRadius: 0,
    backgroundColor: 'darkorange',
  },
  year: {
    margin: 0,
    fontSize: 20,
    color: 'white',
  },
  insideText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
  },
  yearValue: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  infoText: {
    display: 'flex',
    margin: 0,
    fontSize: 25,
    color: 'white',
  },
});
