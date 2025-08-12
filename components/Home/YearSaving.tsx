import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function YearSaving() {
  const { getAllGoals } = useSavingsStore();
  const [availableYears, setAvailableYears] = useState(getAllGoals());
  const test = availableYears.map(item => {
    console.log(item.savings?.map(item => console.log(item.date)));
  });
  console.log(test);

  // useEffect(() => {
  //   if (availableYears) {
  //     const years = [
  //       ...new Set(
  //         availableYears.map(saving => {
  //           console.log(saving);
  //            const date = new Date(saving.date);
  //            return date.getFullYear().toString();
  //         }),
  //       ),
  //     ];

  //     // years.sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  //     // setAvailableYears(years);
  //   }
  // }, [getAllGoals]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideText}>
          {/* <Text style={styles.yearValue}>+{getTotalSavings()} zł</Text> */}
          <Text style={styles.infoText}>Zaoszczędzone</Text>
          {/* <Text style={styles.year}>{availableYears[0]}</Text> */}
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
