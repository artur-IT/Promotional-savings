import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function MonthSaving() {
  const { getAllGoals, allGoals } = useSavingsStore();

  const [currentMonthSavings, setCurrentMonthSavings] = useState(0);
  const [currentMonthName, setCurrentMonthName] = useState('');

  useEffect(() => {
    const getCurrentMonthData = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthNames = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
      ];

      setCurrentMonthName(monthNames[currentMonth]);

      // Get all goals and calculate sum of savings from current month
      const allGoals = getAllGoals();
      let sum = 0;

      // Loop through all goals and their savings
      allGoals.forEach(goal => {
        if (goal.savings) {
          goal.savings.forEach(saving => {
            const savingDate = new Date(saving.date);
            if (
              savingDate.getMonth() === currentMonth &&
              savingDate.getFullYear() === currentYear
            ) {
              sum += saving.promotion;
            }
          });
        }
      });

      setCurrentMonthSavings(sum);
    };

    getCurrentMonthData();
  }, [allGoals]);

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    height: 190,
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 95,
    backgroundColor: 'orange',
  },
  insideText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthValue: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    fontSize: 36,
    color: 'white',
  },
  monthName: {
    display: 'flex',
    margin: 0,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
