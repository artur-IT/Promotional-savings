import { StyleSheet, Text, View } from 'react-native';
import useSavingsStore from '../../store/useSavingsStore_Zustand';

export default function HistoryGoalsComponent() {
  const { getAchivedGoals } = useSavingsStore();

  return (
    <View style={styles.container}>
      <Text>History Goals COMPONENT</Text>
      <Text>Cele osiągnięte:</Text>
      {getAchivedGoals().map((item, index) => (
        <View key={index}>
          <Text style={styles.text}>Nazwa celu: {item.goal.toUpperCase()}</Text>
          <Text style={styles.text}>
            Cel: <Text style={styles.greenValue}>{item.targetAmount} zł</Text>
          </Text>
          <Text style={styles.text}>
            Nazbieranych promocji: {item.totalPromotionSum} zł
          </Text>
          <Text style={styles.text}>Zbierałem od: {item.startDate}</Text>
          <Text style={styles.text}>Osiągnąłem cel: {item.achievedDate}</Text>
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
});
