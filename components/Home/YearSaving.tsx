import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function YearSaving() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideText}>
          <Text style={styles.yearValue}>150 zł</Text>
          <Text style={styles.infoText}>Zaoszczędzone</Text>
          <Text style={styles.year}>2025</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
  },
  year: {
    margin: 0,
    fontSize: 20,
  },
  insideText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  yearValue: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 0,
    fontSize: 40,
  },
  infoText: {
    display: "flex",
    margin: 0,
    fontSize: 25,
  },
});
