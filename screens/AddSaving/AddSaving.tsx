import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Top from '../../components/Top';
import DataSavings from '../../components/AddSaving/DataSavings';
import { colors } from '../../constants/colors';

export default function AddSavingScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.view}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.contentContainer}>
        <Top />
        <View style={styles.container}>
          <Text style={styles.title}>Dzisiaj </Text>
          <Text style={styles.title}>zaoszczędziłem</Text>
        </View>

        <DataSavings />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.background.main,
    flex: 1,
  },
  contentContainer: {
    minHeight: '100%',
    paddingBottom: 50,
  },
  container: {
    display: 'flex',
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: colors.background.main,
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
