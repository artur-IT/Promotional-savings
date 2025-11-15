import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export default function YearSaving() {
  const { getAllGoals, allGoals } = useSavingsStore();
  const [thisYearTotal, setThisYearTotal] = useState(0);
  const [thisYear, setThisYear] = useState(0);

  const calculateThisYearSavings = () => {
    const allGoals = getAllGoals();
    const currentYear = new Date().getFullYear();
    setThisYear(currentYear);
    let totalSavings = 0;

    if (allGoals.length === 0) return 0;

    // Go through each goal
    allGoals.forEach(goal => {
      if (goal.savings) {
        // Go through each saving in the goal
        goal.savings.forEach(saving => {
          const savingDate = new Date(saving.date); // Create date object from text
          const savingYear = savingDate.getFullYear();

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
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.background.orange,
  },
  year: {
    margin: 0,
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 16,
  },
  insideText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: colors.text.button_W,
  },
  yearValue: {
    textAlign: 'right',
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 24,
  },
  infoText: {
    display: 'flex',
    margin: 0,
    fontFamily: fonts.family.primary,
    color: colors.text.button_W,
    fontSize: 16,
  },
});
