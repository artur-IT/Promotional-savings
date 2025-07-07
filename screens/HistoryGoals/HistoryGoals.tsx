import { StyleSheet, Text, View } from 'react-native';

export default function HistoryGoals() {
  return (
    <View style={styles.container}>
      <Text>HistoryGoals</Text>
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
