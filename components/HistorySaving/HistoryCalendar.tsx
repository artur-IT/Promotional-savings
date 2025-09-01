import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Goal } from '../../constants/dataTypes';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import Button from '../Button';
import { colors } from '../../constants/colors';

// Type for individual saving from Goal interface
type Saving = NonNullable<Goal['savings']>[0];

export default function HistoryCalendar({
  selectedYear,
}: {
  selectedYear?: string;
}) {
  const {
    getAllSavings,
    deleteSaving,
    isLatestSavingFromActiveGoal,
    allGoals,
  } = useSavingsStore();
  const [savingsHistory, setSavingsHistory] = useState<Saving[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Get all savings from all goals
    const allSavings = getAllSavings();

    // Filter data by selected year if provided
    let filteredData = [...allSavings];

    if (selectedYear) {
      filteredData = filteredData.filter(saving => {
        const savingYear = new Date(saving.date).getFullYear().toString();
        return savingYear === selectedYear;
      });
    }

    const sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    setSavingsHistory(sortedData);

    // By default expand the first month
    if (sortedData.length > 0) {
      const firstMonthKey = format(sortedData[0].date, 'LLLL', { locale: pl });
      const capitalizedMonth =
        firstMonthKey.charAt(0).toUpperCase() + firstMonthKey.slice(1);
      setExpandedMonths({ [capitalizedMonth]: true });
    }
  }, [selectedYear, allGoals, getAllSavings]);

  const groupByYear = () => {
    const grouped: { [key: string]: Saving[] } = {};

    savingsHistory.forEach(record => {
      const year = new Date(record.date).getFullYear().toString();

      if (!grouped[year]) {
        grouped[year] = [];
      }

      grouped[year].push(record);
    });

    return grouped;
  };

  const groupByMonth = () => {
    const grouped: { [key: string]: Saving[] } = {};

    savingsHistory.forEach(record => {
      // Format LLLL for month name in nominative
      const monthKey = format(record.date, 'LLLL', { locale: pl });
      const capitalizedMonth =
        monthKey.charAt(0).toUpperCase() + monthKey.slice(1);

      if (!grouped[capitalizedMonth]) {
        grouped[capitalizedMonth] = [];
      }

      grouped[capitalizedMonth].push(record);
    });

    return grouped;
  };

  const calculateMonthTotal = (records: Saving[]) => {
    return records
      .reduce((sum, record) => sum + record.promotion, 0)
      .toFixed(2);
  };

  const calculateYearTotal = (records: Saving[]) => {
    return records
      .reduce((sum, record) => sum + record.promotion, 0)
      .toFixed(2);
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const groupedData = groupByMonth();
  const groupedByYearData = groupByYear();

  // Check if there is the latest saving from active goal in current view
  const hasLatestActiveSaving = savingsHistory.some(saving =>
    isLatestSavingFromActiveGoal(saving.id),
  );

  return (
    <View style={styles.container}>
      {selectedYear ? (
        // If year is selected, show data grouped by months
        <>
          <View style={styles.header}>
            <Text style={[styles.headerText, styles.flex1]}>Data</Text>
            <Text style={[styles.headerText, styles.flex1]}>Kategoria</Text>
            <Text style={[styles.headerText, styles.flex1, styles.textRight]}>
              Kwota (zł)
            </Text>
            {hasLatestActiveSaving && (
              <Text
                style={[
                  styles.headerText,
                  styles.flex1,
                  styles.textRight,
                  styles.delete,
                ]}
              >
                Usuń
              </Text>
            )}
          </View>

          <ScrollView>
            {Object.entries(groupedData).map(([month, records]) => (
              <View key={month}>
                <TouchableOpacity
                  style={styles.monthHeader}
                  onPress={() => toggleMonth(month)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.monthTitle}>
                    {month} {expandedMonths[month] ? '▼' : '▶'}
                  </Text>

                  {/* Display sum of amounts for collapsed month */}
                  {!expandedMonths[month] && (
                    <Text style={styles.monthTotalAmount}>
                      {calculateMonthTotal(records)} zł
                    </Text>
                  )}
                </TouchableOpacity>

                {expandedMonths[month] && (
                  <View>
                    {records.map((record, index) => (
                      <View
                        key={record.id}
                        style={[
                          styles.recordRow,
                          index % 2 === 0 ? styles.evenRow : styles.oddRow,
                        ]}
                      >
                        <Text style={[styles.recordText, styles.flex1]}>
                          {format(record.date, 'dd.MM.yyyy')}
                        </Text>
                        <Text style={[styles.recordText, styles.flex1]}>
                          {record.category}
                        </Text>
                        <Text
                          style={[
                            styles.amountText,
                            styles.flex1,
                            styles.textRight,
                          ]}
                        >
                          {record.promotion.toFixed(2)}
                        </Text>
                        {isLatestSavingFromActiveGoal(record.id) && (
                          <Text style={[styles.icon]}>
                            <Button
                              title="❌"
                              width={30}
                              height={30}
                              bgColor="white"
                              onPress={() => {
                                deleteSaving(record.id);
                              }}
                            />
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        // If no year selected, show data grouped by years
        <ScrollView>
          <View style={styles.header}>
            <Text style={[styles.headerText, styles.flex1]}>Rok</Text>
            <Text style={[styles.headerText, styles.flex1, styles.textRight]}>
              Suma oszczędności (zł)
            </Text>
          </View>

          {Object.entries(groupedByYearData).map(([year, records]) => (
            <View key={year} style={styles.yearRow}>
              <Text style={[styles.yearText, styles.flex1]}>{year}</Text>
              <Text style={[styles.yearAmount, styles.flex1, styles.textRight]}>
                {calculateYearTotal(records)} zł
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Suma oszczędności:{' '}
          <Text style={styles.totalAmount}>
            {savingsHistory
              .reduce((sum, record) => sum + record.promotion, 0)
              .toFixed(2)}{' '}
            zł
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
    backgroundColor: colors.background.main,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    color: colors.calendar.blue,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.calendar.blueLight,
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 4,
  },
  headerText: {
    fontWeight: '600',
    color: colors.calendar.blueDark,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  monthHeader: {
    backgroundColor: colors.calendar.blueVeryLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    fontWeight: 'bold',
    color: colors.calendar.blue,
  },
  monthTotalAmount: {
    fontWeight: '500',
    color: colors.calendar.green,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.calendar.grayBorder,
  },
  yearRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.calendar.grayBorder,
    backgroundColor: colors.calendar.grayLight,
  },
  yearText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.calendar.blue,
  },
  yearAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.calendar.green,
  },
  evenRow: {
    backgroundColor: colors.calendar.grayLight,
  },
  oddRow: {
    backgroundColor: colors.background.main,
  },
  recordText: {
    color: colors.calendar.grayText,
  },
  amountText: {
    fontWeight: '500',
    color: colors.calendar.green,
  },
  footer: {
    marginTop: 16,
    backgroundColor: colors.calendar.grayBackground,
    padding: 12,
    borderRadius: 8,
  },
  footerText: {
    textAlign: 'center',
    color: colors.calendar.grayText,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: colors.calendar.green,
  },
  flex1: {
    flex: 1,
  },
  textRight: {
    textAlign: 'right',
  },
  delete: {
    width: 10,
  },
  icon: {
    marginLeft: 10,
  },
});
