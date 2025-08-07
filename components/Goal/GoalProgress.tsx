import { Image, StyleSheet, Text, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function GoalProgress() {
  const { getActualGoal } = useSavingsStore();
  const goal = getActualGoal();

  // Sprawdzamy, czy goal to tablica. Jeśli tak, sumujemy totalPromotionSum dla każdego elementu.
  let totalPromotionSum = 0;
  if (Array.isArray(goal)) {
    totalPromotionSum = goal.reduce(
      (sum: number, goalItem: any) => sum + (goalItem.totalPromotionSum || 0),
      0,
    );
  } else if (goal && typeof goal === 'object') {
    // Jeśli goal to pojedynczy obiekt, bierzemy jego totalPromotionSum
    totalPromotionSum = goal.totalPromotionSum || 0;
  }

  if (!goal) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Musisz mieć cel oszczędzania!</Text>
      </View>
    );
  }

  const bigName = goal?.goal || 'Cel';
  const goalAmount = goal?.targetAmount || 0;

  const progressPercent =
    goalAmount > 0 ? (totalPromotionSum / goalAmount) * 100 : 0;
  const progressRatio = goalAmount > 0 ? totalPromotionSum / goalAmount : 0;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>Zbieram na</Text>
        <Text style={styles.descriptionTitle}>
          {bigName.toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.progressSection}>
        <View style={styles.progressTargetContainer}>
          <Text
            style={[
              styles.progressSum,
              totalPromotionSum > goalAmount ? styles.successValue : null,
            ]}
          >
            {totalPromotionSum} zł
          </Text>
          <Text style={styles.progressTarget}>{goalAmount} zł</Text>
        </View>

        <ProgressBar
          progress={progressRatio}
          width={260}
          height={12}
          color={'green'}
          animated={true}
          unfilledColor={'lightgreen'}
        />
        <Text style={styles.progressPercent}>
          {Number.isInteger(progressPercent)
            ? progressPercent
            : progressPercent.toFixed(1)}{' '}
          %
        </Text>
      </View>
      {totalPromotionSum >= goalAmount && (
        <View style={styles.successContainer}>
          <Image
            source={require('../../assets/images/sun_new.gif')}
            style={styles.happy}
          />
          <Text style={styles.success}>BRAWO! </Text>
          <Text style={styles.success}> Cel osiągnięty </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: 'white',
  },
  progressTargetContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressSum: {
    alignSelf: 'flex-end',
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 10,
    marginBottom: 10,
  },
  progressTarget: {
    alignSelf: 'flex-end',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  progressPercent: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    width: 250,
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
  descriptionTitle: { fontSize: 30, textAlign: 'right' },
  goal: {
    width: 250,
    fontSize: 30,
    textAlign: 'left',
  },
  progressSection: {
    width: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  successContainer: {
    position: 'absolute',
    top: 200,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  happy: {
    width: 150,
    height: 150,
  },
  success: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'white',
  },
  successValue: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
  },
});
