import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function Header() {
  return (
    <>
      <View style={styles.logo}>
        <Text>Dzisaj zaoszczędziłem</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
  },
});
