import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/goal" style={styles.link}>
        zobacz cel
      </Link>
      <Link href="/addSaving" style={styles.link}>
        Dodaj oszczędność
      </Link>
      <Link href="/about" style={styles.link}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: { borderColor: "red", borderWidth: 1, padding: 10, borderRadius: 5 },
});
