import { Image, StyleSheet, Text, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

interface GoalProgressProps {
  variant?: 'home' | 'goal';
}

export default function GoalProgress({ variant = 'goal' }: GoalProgressProps) {
  const { getActualGoal } = useSavingsStore();
  const goal = getActualGoal();

  // Function that calculates the sum of all savings in the current goal
  const calculateTotalPromotionSum = (goal: any) => {
    if (!goal || !goal.savings || goal.savings.length === 0) {
      return 0;
    }

    return goal.savings.reduce((sum: number, saving: any) => {
      return sum + (saving.promotion || 0);
    }, 0);
  };

  if (!goal) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          {variant === 'home'
            ? 'Brak zdefiniowanych celów'
            : 'Musisz mieć cel oszczędzania!'}
        </Text>
      </View>
    );
  }

  const bigName = goal?.goal || 'Cel';
  const goalAmount = goal?.targetAmount || 0;

  const totalPromotionSum = calculateTotalPromotionSum(goal);

  const progressPercent =
    goalAmount > 0 ? (totalPromotionSum / goalAmount) * 100 : 0;
  const progressRatio = goalAmount > 0 ? totalPromotionSum / goalAmount : 0;

  if (variant === 'home') {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.homeNumbers}>
          <Text
            style={[
              styles.homeProgressNumbers,
              totalPromotionSum > goalAmount ? styles.homeSuccess : null,
            ]}
          >
            {progressPercent % 1 === 0
              ? progressPercent
              : progressPercent.toFixed(1)}{' '}
            %
          </Text>
          {totalPromotionSum >= goalAmount && (
            <Image
              source={require('../../assets/images/sun_new.gif')}
              style={styles.homeHappy}
            />
          )}
          <Text style={styles.homeProgressNumbers}>{goalAmount} zł</Text>
        </View>
        <ProgressBar
          progress={progressRatio}
          width={260}
          height={12}
          color={'green'}
          animated={true}
          unfilledColor={'lightgreen'}
        />
        <Text style={styles.homeDescription}>
          Zbieram i beztrosko wydam je na
        </Text>
        <Text style={styles.homeGoal}>{bigName.toLocaleUpperCase()}</Text>
      </View>
    );
  }

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
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  homeNumbers: {
    width: 400,
    marginBottom: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  homeProgressNumbers: {
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  homeDescription: {
    width: 250,
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
  },
  homeGoal: {
    width: 250,
    fontSize: 30,
    textAlign: 'left',
  },
  homeHappy: {
    position: 'absolute',
    top: -20,
    width: 50,
    height: 50,
  },
  homeSuccess: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
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
