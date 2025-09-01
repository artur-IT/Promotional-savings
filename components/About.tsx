import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../constants/colors';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>O aplikacji</Text>

        <Text style={styles.paragraph}>
          Prosta aplikacja do śledzenia Twoich oszczędności. Zlicza
          zaoszczędzone na różnych wydatkach pieniądze i sumuje je.
        </Text>

        <View style={styles.paragraph}>
          <Text style={styles.bold}>Na przykład:</Text>
          <Text style={styles.paragraph}>
            Kupiłem w promocji 3 kostki masła płacąc za nie 10 zł zamiast 20 zł.
            ZAOSZCZĘDZIŁEM na tej promocji 10 zł, ale nie widzę i nie skorzystam
            z tych zaoszczędzonych 10 zł ponieważ zaraz o tym zapomnę.
          </Text>
          <Text style={[styles.bold, styles.listItem, { color: 'red' }]}>
            🤔 Gdzie jest te 10 zł, które właśnie zaoszczędziłem?
          </Text>
          <Text style={[styles.bold, styles.listItem, { color: '#ff6c00' }]}>
            💡 Ile takich małych kwot 'przepada' w naszej głowie?
          </Text>
          <Text style={[styles.bold, styles.listItem, { color: '#ff6c00' }]}>
            ☝️ A gdyby notować te małe kwoty, uzbierać więcej i wydać je na coś
            przyjemnego?
          </Text>
          <Text style={[styles.bold, styles.listItem, { color: 'green' }]}>
            😊 Przedłuż radość z zaoszczędzonych pieniędzy! {'\n'} Notuj te małe
            kwoty i wydaj je na bezkarnie! {'\n'}
          </Text>
        </View>

        <Text style={styles.title}>Jak to działa</Text>

        <Text style={[styles.paragraph, styles.bold]}>
          1. Musisz podać cel, na który kiedyś wydasz swoje oszczędności.
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>
          2. Wprowadź kwotę zaoszczędzoną na promocji lub usłudze.
        </Text>

        <Text style={[styles.paragraph, styles.bold, { marginBottom: 0 }]}>
          2. Teraz zobaczysz:
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            • sumę kwot zaoszczędzonych w tym miesiącu
          </Text>
          <Text style={styles.listItem}>
            • sumę kwot zaoszczędzonych w bieżącym roku
          </Text>
          <Text style={styles.listItem}>
            • postęp w osiągnięciu swojego celu
          </Text>
          <Text style={styles.listItem}>• historię swoich oszczędności</Text>
          <Text style={styles.listItem}>• historię już osiągniętych celów</Text>
        </View>

        <Text>
          Teraz naprawdę zobaczysz ile zaoszczędziłeś na różnych zakupach lub
          usługach.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: 12,
  },
  paragraph: {
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'justify',
    lineHeight: 22,
  },
  listContainer: {
    marginLeft: 10,
    marginBottom: 12,
  },
  listItem: {
    color: colors.text.primary,
    marginBottom: 2,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
});
