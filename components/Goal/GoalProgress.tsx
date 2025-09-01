import { Image, StyleSheet, Text, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { colors } from '../../constants/colors';

interface GoalProgressProps {
  variant?: 'home' | 'goal';
}

export default function GoalProgress({ variant = 'goal' }: GoalProgressProps) {
  const { getLastGoal, getAllGoals, completeGoal } = useSavingsStore();
  const goal = getLastGoal(); // Show last goal (even completed)
  const completedRef = useRef<Set<number>>(new Set());

  // Function that calculates the sum of all savings in the current goal
  const calculateTotalPromotionSum = useCallback((goal: any) => {
    if (!goal || !goal.savings || goal.savings.length === 0) {
      return 0;
    }

    return goal.savings.reduce((sum: number, saving: any) => {
      return sum + (saving.promotion || 0);
    }, 0);
  }, []);

  // Function to get motivational message based on progress
  const getMotivationalMessage = useCallback((progressPercent: number) => {
    if (progressPercent >= 100) {
      return {
        message: '',
        emoji: '',
        color: '',
      };
    } else if (progressPercent >= 85) {
      return {
        message: 'Już prawie, ostatni sprint! 🏃‍♀️',
        emoji: '🔥',
        color: colors.status.success,
      };
    } else if (progressPercent >= 70) {
      return {
        message: 'Świetnie Ci idzie, trzymaj tempo!',
        emoji: '💪',
        color: colors.primary,
      };
    } else if (progressPercent >= 50) {
      return {
        message: 'W połowie drogi, nie poddawaj się!',
        emoji: '🌟',
        color: colors.primary,
      };
    } else if (progressPercent >= 20) {
      return {
        message: 'Dobry początek, każda złotówka się liczy!',
        emoji: '💰',
        color: colors.secondary,
      };
    } else if (progressPercent > 0) {
      return {
        message: 'Pierwszy krok zrobiony!',
        emoji: '🌱',
        color: colors.secondary,
      };
    } else {
      return {
        message: 'Czas zacząć oszczędzać!',
        emoji: '🚀',
        color: colors.accent,
      };
    }
  }, []);

  // Memoized list of all goals to prevent unnecessary re-renders
  const allGoals = useMemo(() => getAllGoals(), [getAllGoals]);

  // Automatically mark goal as completed when achieved
  useEffect(() => {
    let hasCompletedAnyGoal = false;

    allGoals.forEach(currentGoal => {
      if (
        !currentGoal.endDate &&
        currentGoal.id &&
        !completedRef.current.has(currentGoal.id)
      ) {
        const totalSum = calculateTotalPromotionSum(currentGoal);
        const targetAmount = currentGoal.targetAmount || 0;
        const isAchieved =
          totalSum >= targetAmount && targetAmount > 0 && totalSum > 0;

        if (
          isAchieved &&
          currentGoal.savings &&
          currentGoal.savings.length > 0
        ) {
          console.log(
            'Goal achieved! Saving completion date and sum of savings.',
            currentGoal.id,
          );
          completedRef.current.add(currentGoal.id);
          hasCompletedAnyGoal = true;
        }
      }
    });

    // Call completeGoal only once if any goal was completed
    if (hasCompletedAnyGoal) {
      completeGoal();
    }
  }, [allGoals, completeGoal, calculateTotalPromotionSum]);

  if (!goal) {
    return (
      <View>
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

  // Get motivational message
  const motivationalData = getMotivationalMessage(progressPercent);

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

      {/* Motivational Message */}
      <View style={styles.motivationalContainer}>
        <Text style={styles.motivationalEmoji}>{motivationalData.emoji}</Text>
        <Text
          style={[styles.motivationalText, { color: motivationalData.color }]}
        >
          {motivationalData.message}
        </Text>
      </View>
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
  motivationalContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  motivationalEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
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
    marginTop: 100,
    marginBottom: 100,
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  successContainer: {
    position: 'absolute',
    top: 200,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  },
  happy: {
    width: 150,
    height: 150,
  },
  success: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: colors.background.main,
  },
  successValue: {
    fontSize: 30,
    color: colors.status.success,
    fontWeight: 'bold',
  },
});
