import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

// Usunąłem linię <Stack.Screen name="goal" />,
// ponieważ ta trasa jest już częścią zakładek i nie powinna być rejestrowana ponownie na poziomie głównym.
