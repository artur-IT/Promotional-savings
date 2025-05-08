import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="addSaving" options={{ headerShown: false }} />
      <Stack.Screen name="goal" options={{ headerShown: false, presentation: "modal" }} />
      <Stack.Screen name="historySavings" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
