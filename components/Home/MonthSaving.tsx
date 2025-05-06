import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function MonthSaving() {
  return (
    <View style={styles.section}>
      <View style={styles.insideText}>
        <Text style={styles.monthValue}>150 zł</Text>
        <Text style={styles.monthName}>Październik</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 170,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "50%",
  },
  insideText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  monthValue: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    fontSize: 40,
  },
  monthName: {
    display: "flex",
    margin: 0,
    fontSize: 25,
  },
});
