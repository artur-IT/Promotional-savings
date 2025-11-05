import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import useNavigationStore from '../../store/useNavigationStore';
import { useState } from 'react';

interface TargetProps {
  onFormClose: () => void;
  editGoal: boolean;
}

export default function EditTargetForm({ onFormClose, editGoal }: TargetProps) {
  const { getActualGoal, addNewGoal, updateCurrentGoal } = useSavingsStore();
  const { navigateToTab } = useNavigationStore();
  const goal = getActualGoal();
  const bigName = editGoal ? goal?.goal : '';
  const goalAmount = editGoal ? goal?.targetAmount : '';

  const [goalName, setGoalName] = useState(bigName);
  const [targetAmount, setTargetAmount] = useState(goalAmount);
  const [errors, setErrors] = useState<{
    goalName?: string;
    goalValue?: string;
  }>({});

  const cancelHandle = () => {
    onFormClose();
  };

  const saveHandle = () => {
    const newErrors: {
      goalName?: string;
      goalValue?: string;
    } = {};
    let isValid = true;

    if (!goalName?.trim()) {
      newErrors.goalName = 'Podaj cel oszczędzania';
      isValid = false;
    } else if (!isNaN(Number(goalName.trim()))) {
      newErrors.goalName = 'Cel nie może być liczbą';
      setGoalName(''); // Clear the numeric value
      isValid = false;
    }

    if (!`${targetAmount}`.trim()) {
      newErrors.goalValue = 'Kwota celu nie może być pusta';
      isValid = false;
    } else {
      const amount = parseFloat(`${targetAmount}`);
      if (isNaN(amount)) {
        newErrors.goalValue = 'Kwota musi być liczbą';
        setTargetAmount(''); // Clear the non-numeric value
        isValid = false;
      } else if (amount <= 0) {
        newErrors.goalValue = 'Kwota musi być większa od zera';
        isValid = false;
      }
    }
    setErrors(newErrors);

    if (isValid) {
      const newGoal = {
        id: Date.now(),
        goal: goalName,
        targetAmount: parseFloat(`${targetAmount}`),
        startDate: new Date().toISOString().split('T')[0], // Set actual goal creation date
        savings: [],
      };
      editGoal
        ? updateCurrentGoal(goalName || '', parseFloat(`${targetAmount}`))
        : addNewGoal(newGoal);

      navigateToTab('home');
      onFormClose();
    }
  };

  // Functions to clear errors after clicking on field
  const handleGoalNameFocus = () => {
    setErrors(prev => ({ ...prev, goalName: undefined }));
  };

  const handleTargetAmountFocus = () => {
    setErrors(prev => ({ ...prev, goalValue: undefined }));
  };

  const clearGoalName = () => setGoalName('');
  const clearTargetAmount = () => setTargetAmount('');

  return (
    <View style={styles.container}>
      {/* Target Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Cel</Text>
        <TextInput
          style={errors.goalName ? styles.errorBg : styles.targetInput}
          value={goalName}
          onChangeText={setGoalName}
          onFocus={handleGoalNameFocus}
          placeholder={errors.goalName || 'Na co zbierasz?'}
          placeholderTextColor={errors.goalName ? 'red' : 'gray'}
          maxLength={25}
        />
        <Button title="usuń" width={60} onPress={clearGoalName} />
      </View>

      {/* Target Value */}
      <View style={styles.row}>
        <Text style={styles.label}>Kwota</Text>
        <TextInput
          style={[
            errors.goalValue ? styles.errorBg : styles.targetInput,
            styles.targetInputValue,
          ]}
          keyboardType="numeric"
          value={`${targetAmount}`}
          placeholder={errors.goalValue || 'Ile chcesz zaoszczędzić?'}
          placeholderTextColor={errors.goalValue ? 'red' : 'gray'}
          maxLength={4}
          onChangeText={setTargetAmount}
          onFocus={handleTargetAmountFocus}
        />
        <Button title="usuń" width={60} onPress={clearTargetAmount} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button title={editGoal ? 'Popraw' : 'Zapisz'} onPress={saveHandle} />
        <Button title="Anuluj" onPress={cancelHandle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    height: 180,
    backgroundColor: colors.background.card,
    borderRadius: 10,
    zIndex: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 60,
    fontSize: 16,
    color: colors.text.button_W,
  },
  targetInput: {
    display: 'flex',
    justifyContent: 'center',
    width: 210,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  targetInputValue: {
    width: 210,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  deleteIcon: {
    marginLeft: 5,
  },
  errorBg: {
    width: 210,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'yellow',
  },
});
