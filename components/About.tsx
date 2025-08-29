import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>O aplikacji</Text>

        <Text style={styles.paragraph}>
          Prosta aplikacja mobilna do śledzenia Twoich oszczędności. Pozwala
          zapisywać kwoty, daty oraz kategorie na czym zaoszczędziłeś/aś
          pieniądze.
        </Text>

        <Text style={styles.paragraph}>
          Aplikacja zlicza Twoje zaoszczędzone na różnych wydatkach pieniądze i
          sumuje je.
        </Text>

        <Text style={styles.title}>Jak to działa</Text>

        <Text style={[styles.paragraph, styles.bold]}>
          1. Musisz podać cel, na który kiedyś wydasz swoje oszczędności.
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>
          2. Wprowadź kwotę zaoszczędzoną na promocji, datę kiedy ta kwota była
          uzyskana oraz na czym zaoszczędziłeś/aś.
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>2. Teraz zobaczysz:</Text>
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
          <Text style={styles.listItem}>• historię osiągniętych celów</Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.bold}>Na przykład:</Text>
          <Text style={styles.paragraph}>
            Zaoszczędziłem 17 zł na zakupie żywności, ale nie widzę i nie
            skorzystam z tych zaoszczędzonych 17 zł ponieważ zaraz o tym
            zapomnę. Gdzie jest te 17 zł, które właśnie zaoszczędziłem?
          </Text>
        </View>

        <Text style={[styles.paragraph, styles.bold]}>
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
    backgroundColor: '#eee',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#222',
  },
  paragraph: {
    color: '#222',
    marginBottom: 12,
    textAlign: 'justify',
    lineHeight: 22,
  },
  listContainer: {
    marginLeft: 10,
    marginBottom: 12,
  },
  listItem: {
    color: '#222',
    marginBottom: 2,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
});
