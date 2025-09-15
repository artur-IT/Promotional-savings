import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Top from '../../components/Top';
import EditTargetForm from '../../components/Goal/EditTargetForm';
import GoalProgress from '../../components/Goal/GoalProgress';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { fonts } from '../../constants/fonts';

export default function Goal() {
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { getActualGoal } = useSavingsStore();
  const [editMode, setEditMode] = useState(false);

  // Get current goal
  const currentGoal = getActualGoal();

  // Memoized function checking if goal was achieved
  const isGoalAchieved = useMemo(() => {
    if (
      !currentGoal ||
      !currentGoal.targetAmount ||
      currentGoal.targetAmount === 0
    ) {
      return false;
    }

    const totalPromotionSum =
      currentGoal.savings?.reduce((sum, saving) => {
        return sum + (saving.promotion || 0);
      }, 0) || 0;

    return totalPromotionSum >= currentGoal.targetAmount;
  }, [currentGoal]);

  // Determine button title and action based on goal state
  const buttonTitle = !currentGoal || isGoalAchieved ? 'Nowy' : 'Edytuj';
  const isEditMode = buttonTitle === 'Edytuj';

  const addHandle = () => {
    setEditMode(isEditMode);

    if (showForm) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowForm(false);
      });
    } else {
      setShowForm(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const historylHandle = () => {
    (navigation as any).navigate('HistoryGoals');
  };

  return (
    <>
      <Top />

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Mój Cel </Text>
          <Button title={buttonTitle} onPress={addHandle} />
          <Button title="Historia" height={35} onPress={historylHandle} />
        </View>

        <View style={styles.goal}>
          <GoalProgress variant="goal" />
        </View>
      </View>

      {showForm && (
        <View style={styles.showForm}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <EditTargetForm
              onFormClose={() => setShowForm(false)}
              editGoal={editMode}
            />
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    fontSize: 26,
    marginBottom: 10,
    backgroundColor: colors.background.main,
    zIndex: 0,
  },
  headerContent: {
    top: 150,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: fonts.family.roboto,
  },
  goal: {
    marginTop: 90,
  },
  showForm: {
    zIndex: 10,
  },
});
