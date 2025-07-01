import { View, Text, StyleSheet } from 'react-native';
import Top from '../../components/Top';
import DataSavings from '../../components/AddSaving/DataSavings';

export default function AddSavingScreen() {
  return (
    <View style={styles.view}>
      <Top />
      <View style={styles.container}>
        <Text style={styles.title}>Dzisiaj </Text>
        <Text style={styles.title}>zaoszczędziłem</Text>
      </View>

      <DataSavings />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    display: 'flex',
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
});
