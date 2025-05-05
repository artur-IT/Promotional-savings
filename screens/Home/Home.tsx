import { StyleSheet, View } from "react-native";
import Header from "../../components/Top";
import YearSaving from "../../components/Home/YearSaving";
import MonthSaving from "../../components/Home/MonthSaving";
import LastAdd from "../../components/Home/LastAdd";
import GoalProgress from "../../components/Home/GoalProgress";
import React from "react";

export default function HomeWithGoal() {
  return (
    <>
      <View style={styles.container}>Str. Główna (ze screens)</View>;
      <Header />
      <YearSaving />
      <MonthSaving />
      <LastAdd />
      <GoalProgress />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
