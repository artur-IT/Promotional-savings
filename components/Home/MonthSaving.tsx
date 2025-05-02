import { StyleSheet } from "react-native";
import React from "react";

export default function MonthSaving() {
  return (
    <>
      <section style={styles.section}>
        <div style={styles.insideText}>
          <p style={styles.monthValue}>150 zł</p>
          <p style={styles.monthName}>Październik</p>
        </div>
      </section>
    </>
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
