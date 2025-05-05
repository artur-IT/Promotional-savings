import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <h2>O co chodzi?</h2>
        <p>
          Prosta aplikacja mobilna do śledzenia oszczędności użytkownika, pozwalająca zapisywać kwoty, daty oraz kategorie na czym
          zaoszczędziłeś/aś pieniądze.
        </p>
        <p>Aplikacja zlicza moje zaoszczędzone na zakupach pieniądze i sumuje je.</p>
        <p>1. Wprowadź kwotę zaoszczędzoną i datę kiedy ta kwota była uzyskana.</p>
        <p>2. Zobaczycz:</p>
        <p>- sumę kwot zaoszczędzonych w tym miesiącu </p>
        <p>- sumę kwot zaoszczędzonych w bieżącym roku</p>
        <p>- historię swoich oszczędności</p>
        <p>3. Podaj cel, na który kiedyś wydasz te pieniądze.</p>
        Na przykład: <br />
        <p>
          Zaoszczędziłem np. 17 zł na zakupie żywności, ale nie widzę i nie korzystam z tych zaoszczędzonych 17 zł. Gdzie jest te 17 zł,
          które zaoszczędziłem?
        </p>
        <p>Teraz naprawdę widzę ile zaoszczędziłem na różnych zakupach.</p>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    padding: 20,
  },
});
