import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { colors } from '../constants/colors';
import { getVersionString } from '../constants/version';

export default function AboutScreen() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    getVersionString().then(setVersion);
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>O aplikacji</Text>

        {/* 'textIndent' is not supported in React Native styles, so we can simulate indentation by adding spaces at the start of the text */}
        <Text style={styles.paragraph}>
          {'  '}Prosta aplikacja do śledzenia Twoich oszczędności. Zlicza
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
            ☝️ A gdyby notować te małe kwoty i wydać je na coś przyjemnego?
          </Text>
          <Text style={[styles.bold, styles.listItem, { color: 'green' }]}>
            😊 Przedłuż radość z zaoszczędzonych pieniędzy! {'\n'} Notuj te małe
            kwoty i wydaj je bezkarnie na co chcesz! {'\n'}
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
            • postęp w realizacji swojego celu
          </Text>
          <Text style={styles.listItem}>• historię swoich oszczędności</Text>
          <Text style={styles.listItem}>• historię już osiągniętych celów</Text>
        </View>

        <Text>
          Teraz naprawdę zobaczysz ile zaoszczędziłeś na różnych zakupach lub
          usługach.
        </Text>

        <Text style={styles.footer}>Promotional Savings {version}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  container: {
    marginTop: 70,
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
  footer: {
    color: colors.primary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
