import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import { addGoal, getAllGoals } from '../../store/goalsStore';
import { useState } from 'react';

export default function EditTargetForm({
  onFormClose,
}: {
  onFormClose: () => void;
}) {
  const navigation = useNavigation();

  const goal = getAllGoals();
  const bigName = goal[0]?.goal || '';
  const goalAmount = goal[0]?.targetAmount || '';

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

    if (!goalName.trim()) {
      newErrors.goalName = 'Podaj cel ozczędzania';
      isValid = false;
    }

    if (!`${targetAmount}`.trim()) {
      newErrors.goalValue = 'Kwota celu nie może być pusta';
      isValid = false;
    } else {
      const amount = parseFloat(`${targetAmount}`);
      if (isNaN(amount) || amount <= 0) {
        newErrors.goalValue = 'Kwota musi być liczbą większą od zera';
        isValid = false;
      }
    }
    setErrors(newErrors);

    if (isValid) {
      addGoal({
        goal: goalName,
        targetAmount: parseFloat(`${targetAmount}`),
      });
      Alert.alert('Sukces', 'Cel został dodany pomyślnie', [
        {
          text: 'OK',
          onPress: () => (navigation as any).navigate('Home'),
        },
      ]);
      onFormClose();
    }
  };

  // Funkcje do czyszczenia błędów po kliknięciu w pole
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
          placeholder="Nazwa celu"
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
          placeholder="Ile chcesz zaoszczędzić?"
          onChangeText={setTargetAmount}
          onFocus={handleTargetAmountFocus}
        />
        <Button title="usuń" width={60} onPress={clearTargetAmount} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button title="Zapisz" onPress={saveHandle} />
        <Button title="Anuluj" onPress={cancelHandle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 25,
    height: 210,
    backgroundColor: colors.background.card,
    borderRadius: 10,
    zIndex: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    width: 50,
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
    marginTop: 10,
  },
  deleteIcon: {
    marginLeft: 5,
  },
  errorBg: {
    width: 210,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'yellow',
  },
});
