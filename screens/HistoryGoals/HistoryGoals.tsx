import { StyleSheet, ScrollView } from 'react-native';
import HistoryGoalsComponent from '../../components/HistoryGoals/HistoryGoals';

export default function HistoryGoals() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <HistoryGoalsComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    paddingBottom: 50,
  },
});
