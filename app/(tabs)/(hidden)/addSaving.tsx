import AddSaving from "@/screens/AddSaving/AddSaving";

import React from "react";
import { Stack } from "expo-router";

export default function addSaving() {
  return (
    <>
      <Stack.Screen options={{ presentation: "modal", headerShown: false }} />
      <AddSaving />
    </>
  );
}
