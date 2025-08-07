import { StyleSheet, Text, View } from 'react-native';
import useSavingsStore from '../../store/useSavingsStore_Zustand';
import Button from '../Button';

export default function HistoryGoalsComponent() {
  const { deleteAllGoals, getAllGoals } = useSavingsStore();

  function getDaysBetween(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate.getTime() - startDate.getTime();
    // Zamieniamy milisekundy na dni
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays); // zaokrąglenie w dół
  }

  // Przykład użycia:
  const days = getDaysBetween('2024-06-01', '2024-06-10');
  console.log(days);

  return (
    <View style={styles.container}>
      <Button title="Usuń" bgColor="red" onPress={() => deleteAllGoals()} />

      <Text>History Goals COMPONENT</Text>
      <Text>Cele osiągnięte:</Text>
      {getAllGoals().map((item, index) => (
        <View key={index} style={styles.goalAchived}>
          <Text style={styles.text}>
            Oszczędzałem na: {item.goal?.toUpperCase()}
          </Text>
          <Text style={styles.text}>
            Cel: <Text style={styles.greenValue}>{item.targetAmount} zł</Text>
          </Text>
          <Text style={styles.text}>
            Nazbieranych promocji: {item.totalPromotionSum} zł
          </Text>
          <Text style={styles.text}>Zbierałem od: {item.startDate}</Text>
          <Text style={styles.text}>Osiągnąłem cel: {item.endDate}</Text>
          <Text style={styles.text}>Dni: </Text>
          <Text>--------------------------------</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 4,
  },
  greenValue: {
    color: 'green',
    fontWeight: 'bold',
  },
  goalAchived: {
    marginTop: 20,
  },
});
