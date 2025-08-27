import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import Button from '../Button';
import ConfirmationModal from '../ConfirmationModal';

export default function HistoryGoalsComponent() {
  const { deleteAllGoals, getCompletedGoals } = useSavingsStore();
  const [showAlert, setShowAlert] = useState(false);

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

    // Find the date of the first saving
    const firstSavingDate = goal.savings[0]?.date;
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

  const completedGoals = getCompletedGoals();

  return (
    <View style={styles.container}>
      <Button
        title="Usuń wszystkie cele!"
        width={200}
        bgColor="red"
        onPress={handleDeleteAllGoals}
      />

      <Text style={styles.title}>Historia Osiągniętych Celów</Text>

      {completedGoals.length === 0 ? (
        <Text style={styles.noGoalsText}>Brak osiągniętych celów</Text>
      ) : (
        completedGoals.map((item, index) => {
          const totalPromotions = calculateTotalPromotions(item.savings);
          const daysToAchieve = getDaysBetween(item);

          return (
            <View key={index} style={styles.goalAchived}>
              <Text style={styles.text}>
                Oszczędzałem na:{' '}
                <Text style={styles.goalName}>{item.goal?.toUpperCase()}</Text>
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
                    ? formatDate(item.savings[0].date)
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

      {/* Confirmation modal for deleting all goals */}
      <ConfirmationModal
        visible={showAlert}
        title="⚠️ Jesteś pewien?"
        message="Ta operacja usunie wszystkie osiągnięte cele. Nie można jej cofnąć."
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#666',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    color: '#333',
  },
  goalName: {
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  greenValue: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  blueValue: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  dateValue: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  daysValue: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  goalAchived: {
    marginTop: 20,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#777',
    width: '100%',
    maxWidth: 350,
  },
  noGoalsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
