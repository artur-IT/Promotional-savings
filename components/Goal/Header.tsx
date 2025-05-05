import { StyleSheet, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function Header() {
  return (
    <>
      {/* <div style={styles.container}>Header: Logo + tytuł (z components)</div>; */}
      <div style={styles.logo}>
        <Text>Mój Cel</Text>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
