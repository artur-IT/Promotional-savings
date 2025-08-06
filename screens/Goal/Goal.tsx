import { Alert, Animated, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Top from '../../components/Top';
import EditTargetForm from '../../components/Goal/EditTargetForm';
import GoalProgress from '../../components/Goal/GoalProgress';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import deleteActualGoal from '../../store/useSavingsStore_Zustand';
import getActualGoal from '../../store/useSavingsStore_Zustand';

export default function Goal() {
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const addHandle = () => {
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

  const deleteHandle = () => {
    Alert.alert(
      'Czy na pewno chcesz usunąć wszystkie cele?',
      'Usunięcie celu spowoduje usunięcie wszystkich zapisanych celów.',
      [
        {
          text: 'Nie',
          style: 'cancel',
        },
        {
          text: 'Tak',
          onPress: () => deleteActualGoal(),
        },
      ],
    );
  };

  const historylHandle = () => {
    (navigation as any).navigate('HistoryGoals');
  };

  return (
    <>
      <Top />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Mój Cel </Text>
          <Button title="Nowy" onPress={addHandle} />
          <Button
            title={`${getActualGoal() !== null ? 'Edytuj' : 'Dodaj'}`}
            onPress={addHandle}
          />
          <Button title="Usuń" height={35} onPress={() => deleteHandle()} />
          <Button title="Historia" height={35} onPress={historylHandle} />
        </View>

        {showForm && (
          <View style={styles.showForm}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <EditTargetForm onFormClose={() => setShowForm(false)} />
            </Animated.View>
          </View>
        )}

        <View style={styles.goal}>
          <GoalProgress />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'white',
    marginTop: 10,
  },
  headerContainer: {
    position: 'relative',
    top: 40,
    width: 100,
    fontSize: 26,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: colors.background.main,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  goal: {
    marginTop: -20,
    marginBottom: 30,
  },
  showForm: {
    zIndex: 100,
  },
});
