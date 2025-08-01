import { StyleSheet, Text, View } from 'react-native';

export default function HistoryGoalsComponent() {
  return (
    <View style={styles.container}>
      <Text>History Goals COMPONENT</Text>
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
