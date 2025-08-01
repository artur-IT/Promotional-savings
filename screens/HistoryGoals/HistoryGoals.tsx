import { StyleSheet, View } from 'react-native';
import HistoryGoalsComponent from '../../components/HistoryGoals/HistoryGoals';

export default function HistoryGoals() {
  return (
    <View style={styles.container}>
      <HistoryGoalsComponent />
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
});
