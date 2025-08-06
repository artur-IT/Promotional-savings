import HistoryCalendar from '../../components/HistorySaving/HistoryCalendar';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import Top from '../../components/Top';
import { useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
// import { clearAllSavings } from '../../store/savingsStore';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
// import Button from '../../components/Button';

export default function HistorySavings() {
  const { allGoals } = useSavingsStore();
  const [selectYear, setSelectYear] = useState('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Zaczynamy od 1, aby kalendarz był widoczny

  useEffect(() => {
    if (allGoals && allGoals.length > 0) {
      // Wyciągnij lata z danych i usuń duplikaty
      const years = [
        ...new Set(
          allGoals
            .map(saving => {
              // Sprawdzamy czy saving ma właściwość 'date'
              if ('date' in saving && saving.date) {
                const date = new Date((saving as any).date);
                return date.getFullYear().toString();
              }
              return '';
            })
            .filter(year => year !== ''),
        ),
      ];
      // Najpierw sortujemy lata malejąco (od najnowszego)
      const sortedYears = years.sort(
        (a: string, b: string) => parseInt(b, 10) - parseInt(a, 10),
      );
      setAvailableYears(sortedYears);
    }
  }, [allGoals]);

  const handleYearChange = (year: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectYear(year);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ScrollView style={styles.view}>
      <Top />
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Historia </Text>
          <Text style={styles.title}>oszczędności</Text>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectYear}
            onValueChange={value => handleYearChange(value)}
          >
            <Picker.Item label="Rok" />
            {availableYears.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
      {/* 
      <View style={styles.deleteButton}>
        <Button title="USUŃ" width={70} onPress={clearAllSavings} />
      </View> */}

      <Animated.View style={{ opacity: fadeAnim }}>
        <HistoryCalendar selectedYear={selectYear} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerContainer: {
    fontSize: 26,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
  },
  picker: {
    width: 100,
    backgroundColor: 'white',
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 15,
  },
});
