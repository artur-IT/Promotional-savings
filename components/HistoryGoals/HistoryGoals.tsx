import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import Button from '../Button';
import ConfirmationModal from '../ConfirmationModal';
import { colors } from '../../constants/colors';

export default function HistoryGoalsComponent() {
  const { deleteAllGoals, completeGoal } = useSavingsStore();
  const [showAlert, setShowAlert] = useState(false);

  // Get all goals directly from store state
  const allGoals = useSavingsStore(state => state.allGoals);

  // Check for achieved goals and mark them as completed
  useEffect(() => {
    let hasCompletedAnyGoal = false;

    allGoals.forEach(goal => {
      if (!goal.endDate && goal.savings && goal.savings.length > 0) {
        const totalSum = goal.savings.reduce(
          (sum, saving) => sum + (saving.promotion || 0),
          0,
        );
        const targetAmount = goal.targetAmount || 0;
        const isAchieved =
          totalSum >= targetAmount && targetAmount > 0 && totalSum > 0;

        if (isAchieved) {
          hasCompletedAnyGoal = true;
        }
      }
    });

    if (hasCompletedAnyGoal) {
      completeGoal();
    }
  }, [allGoals, completeGoal]);

  // Memoize completed goals to prevent unnecessary recalculations
  const completedGoals = useMemo(() => {
    return allGoals.filter(goal => goal.endDate);
  }, [allGoals]);

  const handleDeleteAllGoals = () => {
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    deleteAllGoals();
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  function getDaysBetween(goal: any): number {
    // Check if the goal has savings
    if (!goal.savings || goal.savings.length === 0) {
      return 0;
    }

    // Find the date of the EARLIEST saving (not just first in array)
    const sortedSavings = [...goal.savings].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const firstSavingDate = sortedSavings[0]?.date;
    const endDate = goal.endDate;

    if (!firstSavingDate || !endDate) {
      return 0;
    }

    const startDate = new Date(firstSavingDate);
    const finalDate = new Date(endDate);
    const diffInMs = finalDate.getTime() - startDate.getTime();
    // Convert milliseconds to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays); // round down
  }

  // Function to format date from YYYY-MM-DD to DD.MM.YYYY
  function formatDate(dateString: string): string {
    if (!dateString) return 'Brak daty';

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  }

  // Function to calculate the sum of all promotions in the goal
  function calculateTotalPromotions(
    savings:
      | Array<{ id: number; promotion: number; date: string; category: string }>
      | undefined,
  ): number {
    if (!savings || savings.length === 0) return 0;
    return savings.reduce((sum, saving) => sum + saving.promotion, 0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historia Osiągniętych Celów</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {completedGoals.length === 0 ? (
          <Text style={styles.noGoalsText}>Brak osiągniętych celów</Text>
        ) : (
          completedGoals.map((item, index) => {
            const totalPromotions = calculateTotalPromotions(item.savings);
            const daysToAchieve = getDaysBetween(item);

            return (
              <View key={item.id} style={styles.goalAchived}>
                <Text style={styles.text}>
                  Oszczędzałem na:{' '}
                  <Text style={styles.goalName}>
                    {item.goal?.toUpperCase()}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Cel:{' '}
                  <Text style={styles.greenValue}>{item.targetAmount} zł</Text>
                </Text>
                <Text style={styles.text}>
                  Suma wszystkich promocji:{' '}
                  <Text style={styles.blueValue}>
                    {totalPromotions.toFixed(2)} zł
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Zbierałem od:{' '}
                  <Text style={styles.dateValue}>
                    {item.savings && item.savings.length > 0
                      ? formatDate(
                        [...item.savings].sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime(),
                        )[0].date,
                      )
                      : formatDate(item.startDate)}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Osiągnąłem cel:{' '}
                  <Text style={styles.dateValue}>
                    {item.endDate ? formatDate(item.endDate) : 'Nie osiągnięto'}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Zajęło mi to:{' '}
                  <Text style={styles.daysValue}>{daysToAchieve} dni</Text>
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      <Button
        title="Usuń wszystkie cele!"
        width={185}
        bgColor="red"
        onPress={handleDeleteAllGoals}
      />

      {/* Confirmation modal for deleting all goals */}
      <ConfirmationModal
        visible={showAlert}
        title="⚠️ Jesteś pewien?"
        message={
          <>
            <Text>Ta operacja usunie:</Text>
            {'\n'}
            <Text>- wszystkie osiągnięte cele</Text>
            {'\n'}
            <Text>- wszystkie dane dotyczące aktualnych celów</Text>
            {'\n'}
            <Text>- wszystkie zapisane oszczędności</Text>
          </>
        }
        confirmText="Usuń wszystkie"
        cancelText="Anuluj"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonColor="#EF4444"
        cancelButtonColor="green"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text.secondary,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    color: colors.text.primary,
  },
  goalName: {
    color: colors.goals.purple,
    fontWeight: 'bold',
  },
  greenValue: {
    color: colors.goals.green,
    fontWeight: 'bold',
  },
  blueValue: {
    color: colors.goals.blue,
    fontWeight: 'bold',
  },
  dateValue: {
    color: colors.goals.orange,
    fontWeight: 'bold',
  },
  daysValue: {
    color: colors.goals.red,
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    color: colors.goals.textGray,
    marginTop: 8,
    textAlign: 'center',
  },
  goalAchived: {
    marginTop: 20,
    backgroundColor: colors.goals.lightGray,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.goals.borderGray,
    width: '100%',
    maxWidth: 350,
  },
  noGoalsText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
