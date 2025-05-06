import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.slogan}>Promocyjne</Text>
      <Image source={PlaceholderImage} style={styles.image} />
      <Text style={styles.slogan}>oszczędności</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  slogan: {
    fontSize: 24,
  },
  image: {
    width: 70,
    height: 70,
  },
});
