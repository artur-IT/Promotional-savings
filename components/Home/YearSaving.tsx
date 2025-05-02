import { StyleSheet } from "react-native";
import React from "react";

export default function YearSaving() {
  return (
    <>
      {/* <div style={styles.container}>W tym ROKU zaoszcz. (z components)</div>; */}
      <section style={styles.section}>
        <div style={styles.insideText}>
          <p style={styles.yearValue}>150 zł</p>
          <p style={styles.infoText}>Zaoszczędzone</p>
          <p style={styles.year}>2025</p>
        </div>
      </section>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 120,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "10",
  },
  year: {
    margin: 0,
    fontSize: 20,
  },
  insideText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
