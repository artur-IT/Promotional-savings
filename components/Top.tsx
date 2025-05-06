import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const TopImage = require("@/assets/images/top_bg.svg");
const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
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
    marginTop: 40,
  },
  topImage: {
    position: "absolute",
    top: -70,
    width: 400,
    height: 400,
  },
  slogan: {
    fontSize: 24,
    color: "#ffffff",
  },
  image: {
    width: 70,
    height: 70,
  },
});
