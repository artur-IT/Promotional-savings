// import "nativewind/css";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import Home from "../../screens/Home/Home";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home />
      <Link href="/addSaving" style={styles.link}>
        Dodaj oszczędność
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
  imageContainer: {
    flex: 1,
  },
});
