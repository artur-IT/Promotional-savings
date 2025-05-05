import { StyleSheet } from "react-native";

import React from "react";
import Header from "@/components/Goal/Header";
import Top from "@/components/Top";
import MyGoal from "@/components/Goal/MyGoal";
import NewGoal from "@/components/Goal/NewGoal";

export default function Goal() {
  return (
    <>
      <div style={styles.container}>Cel (ze screens)</div>
      <Top />
      <Header />
      <MyGoal />
      <NewGoal />
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
