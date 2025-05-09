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
    // flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    // height: "auto",
    // marginTop: 40,
    // zIndex: 1,
  },
  topImage: {
    position: "absolute",
    top: -30,
    width: "100%",
    height: 400,
  },
  slogan: {
    position: "relative",
    top: 40,
    fontSize: 24,
    color: "#ffffff",
  },
  image: {
    position: "relative",
    top: 40,
    width: 70,
    height: 70,
  },
});
