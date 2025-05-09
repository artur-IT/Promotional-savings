import { Tabs, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import React from "react";

export default function TabLayout() {
  const pathname = usePathname();
  const isAddSavingScreen = pathname.includes("AddSaving");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerTintColor: "green",
        tabBarStyle: {
          backgroundColor: "#25292e",
          borderColor: "none",
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: false,
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="goal"
        options={{
          headerShown: false,
          title: "Cel",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "heart" : "heart-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="historySavings"
        options={{
          headerShown: false,
          title: "Historia",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "calendar" : "calendar-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(hidden)"
        options={{
          headerShown: false,
          href: null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
