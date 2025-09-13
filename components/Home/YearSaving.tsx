import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export default function YearSaving() {
  const { getAllGoals, allGoals } = useSavingsStore();
  const [thisYearTotal, setThisYearTotal] = useState(0);
  const [thisYear, setThisYear] = useState(0);

  // Function to calculate the sum of deposits from this year
  const calculateThisYearSavings = () => {
    const allGoals = getAllGoals();
    const currentYear = new Date().getFullYear();
    setThisYear(currentYear);
    let totalSavings = 0;

    if (allGoals.length === 0) {
      return 0;
    }

    // Go through each goal
    allGoals.forEach(goal => {
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
  }, [allGoals]);

  return (
    <View style={styles.container}>
      <View style={styles.insideText}>
        <Text style={styles.yearValue}>+{thisYearTotal} zł</Text>
        <Text style={styles.infoText}>Zaoszczędzone</Text>
        <Text style={styles.year}>{thisYear}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.background.orange,
  },
  year: {
    margin: 0,
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 20,
  },
  insideText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    color: colors.text.button_W,
  },
  yearValue: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 40,
  },
  infoText: {
    display: 'flex',
    margin: 0,
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 32,
  },
});
