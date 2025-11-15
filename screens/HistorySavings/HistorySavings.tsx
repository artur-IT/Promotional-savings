import HistoryCalendar from '../../components/HistorySaving/HistoryCalendar';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function HistorySavings() {
  const { allGoals } = useSavingsStore();
  const [selectYear, setSelectYear] = useState('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start from 1 so calendar is visible
  const hasResetRef = useRef(false); // Flag to track if we've reset in this session
  const dropdownAnimation = useRef(new Animated.Value(0)).current;

  // Reset view to default (all years) only on first focus
  useFocusEffect(
    useCallback(() => {
      if (!hasResetRef.current) {
        setSelectYear('');
        hasResetRef.current = true;
      }

      // Reset the flag when leaving the screen so it resets on next visit
      return () => {
        hasResetRef.current = false;
      };
    }, []),
  );

  useEffect(() => {
    if (allGoals && allGoals.length > 0) {
      // Extract years from all savings in all goals
      const years: string[] = [];

      allGoals.forEach(goal => {
        if (goal.savings) {
          goal.savings.forEach(saving => {
            const date = new Date(saving.date);
            const year = date.getFullYear().toString();
            if (!years.includes(year)) {
              years.push(year);
            }
          });
        }
      });

      // Sort years descending (from newest)
      const sortedYears = years.sort(
        (a: string, b: string) => parseInt(b, 10) - parseInt(a, 10),
      );
      setAvailableYears(sortedYears);
    }
  }, [allGoals]);

  const toggleDropdown = () => {
    if (showYearDropdown) {
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowYearDropdown(false));
    } else {
      setShowYearDropdown(true);
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleYearChange = (year: string) => {
    Animated.timing(dropdownAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowYearDropdown(false));

    // Then animate calendar change
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
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Historia </Text>
          <Text style={styles.title}>oszczędności</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              showYearDropdown && styles.dropdownButtonActive,
            ]}
            onPress={toggleDropdown}
            activeOpacity={0.7}
          >
            <View style={styles.dropdownButtonContent}>
              <Text
                style={[
                  styles.dropdownButtonText,
                  !selectYear && styles.placeholderText,
                ]}
              >
                {selectYear || 'Rok'}
              </Text>
              <Text
                style={[
                  styles.dropdownArrow,
                  showYearDropdown && styles.dropdownArrowUp,
                ]}
              >
                ▼
              </Text>
            </View>
          </TouchableOpacity>

          {showYearDropdown && (
            <Animated.View
              style={[
                styles.dropdownList,
                {
                  opacity: dropdownAnimation,
                  transform: [
                    {
                      scale: dropdownAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {[
                { label: 'Wybierz', value: '' },
                ...availableYears.map(year => ({ label: year, value: year })),
              ].map((item, index) => (
                <TouchableOpacity
                  key={item.value || 'all'}
                  style={[
                    styles.dropdownItem,
                    selectYear === item.value && styles.dropdownItemSelected,
                    index === availableYears.length && styles.dropdownItemLast,
                  ]}
                  onPress={() => handleYearChange(item.value)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectYear === item.value &&
                      styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <HistoryCalendar selectedYear={selectYear} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.background.main,
    height: '100%',
    paddingTop: 50,
  },
  headerContainer: {
    fontSize: 26,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: colors.background.main,
  },
  container: {
    display: 'flex',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
  },
  // Custom Dropdown Styles
  dropdownContainer: {
    position: 'relative',
    width: 100,
    zIndex: 1000,
    marginTop: 5,
    elevation: 10,
  },
  dropdownButton: {
    height: 40,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButtonActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownList: {
    position: 'absolute',
    top: 42,
    left: 0,
    width: 100,
    backgroundColor: colors.background.main,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemSelected: {
    backgroundColor: colors.primary + '10', // Add transparency
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  dropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  deleteButton: {
    marginLeft: 15,
  },
});
