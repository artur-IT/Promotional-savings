import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
import EditTargetForm from '../../components/Goal/EditTargetForm';
import GoalProgress from '../../components/Goal/GoalProgress';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import { fonts } from '../../constants/fonts';
import useNavigationStore from '../../store/useNavigationStore';

export default function Goal() {
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { navigateToTab } = useNavigationStore();
  const { getActualGoal } = useSavingsStore();
  const [editMode, setEditMode] = useState(false);
  const currentGoal = getActualGoal();

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

  const historylHandle = () => navigateToTab('historyGoals');

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Mój Cel </Text>
          <Button title={buttonTitle} onPress={addHandle} />
          <Button title="Historia" height={35} onPress={historylHandle} />
        </View>

        <GoalProgress variant="goal" />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 50,
  },
  headerContainer: {
    width: '100%',
    fontSize: 26,
    backgroundColor: colors.background.main,
    zIndex: 0,
  },
  headerContent: {
    marginTop: 20,
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
  showForm: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
