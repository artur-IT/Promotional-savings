import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { colors } from './constants/colors';
import Home from './screens/Home/Home';
import AddSaving from './screens/AddSaving/AddSaving';
import Goal from './screens/Goal/Goal';
import HistoryGoals from './screens/HistoryGoals/HistoryGoals';
import HistorySavings from './screens/HistorySavings/HistorySavings';
import About from './components/About';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Hook to get responsive font size
const useResponsiveFontSize = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const getResponsiveFontSize = (baseFontSize: number): number => {
    const { width } = screenData;

    if (width <= 360) return Math.round(baseFontSize * 0.8);
    else if (width < 414) return baseFontSize;
    else if (width < 768) return Math.round(baseFontSize * 1);
    else return Math.round(baseFontSize * 1.2);
  };
  return getResponsiveFontSize;
};

// Icon mapping for tab navigation
const routeIconMap: Record<string, string> = {
  Home: '🏠',
  Goal: '🏆',
  AddSaving: '➕',
  HistoryGoals: '⏰',
  HistorySavings: '📊',
  About: 'ℹ️',
};

// Helper function to render tab bar label
const createTabBarLabel = (label: string, getResponsiveFontSize: (size: number) => number) => {
  return ({ focused }: { focused: boolean }) => (
    <Text
      style={[
        styles.tabBarLabel,
        focused ? styles.tabBarLabelFocused : styles.tabBarLabelUnfocused,
        {
          fontSize: getResponsiveFontSize(12),
          color: focused
            ? colors.navigation.focused
            : colors.navigation.unfocused,
        },
      ]}
    >
      {label}
    </Text>
  );
};

function BottomTabNavigator() {
  const getResponsiveFontSize = useResponsiveFontSize();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Hide header for all screens
        headerShown: false,
        // Configure tab bar icons
        tabBarIcon: ({ size }) => {
          const icon = routeIconMap[route.name] || '❓';

          return (
            <View style={[styles.iconOuter, { width: size + 16, height: size + 16 }]}>
              <View style={[styles.iconInner, { height: size + 32 }]}>
                <Text style={[styles.iconText, { fontSize: size }]}>{icon}</Text>
              </View>
            </View>
          );
        },
        // Tab bar styling
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: createTabBarLabel('Dom', getResponsiveFontSize),
        }}
      />
      <Tab.Screen
        name="Goal"
        component={Goal}
        options={{
          tabBarLabel: createTabBarLabel('Cel', getResponsiveFontSize),
        }}
      />
      <Tab.Screen
        name="AddSaving"
        component={AddSaving}
        options={{
          tabBarLabel: createTabBarLabel('Dodaj', getResponsiveFontSize),
        }}
      />
      <Tab.Screen
        name="HistoryGoals"
        component={HistoryGoals}
        options={{
          tabBarLabel: createTabBarLabel('Osiągnięte', getResponsiveFontSize),
        }}
      />
      <Tab.Screen
        name="HistorySavings"
        component={HistorySavings}
        options={{
          tabBarLabel: createTabBarLabel('Historia', getResponsiveFontSize),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: createTabBarLabel('Info', getResponsiveFontSize),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar
        backgroundColor="black"
        // barStyle="dark-content"
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: styles.stackContentStyle,
          }}
        >
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

export const styles = StyleSheet.create({
  iconOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    paddingBottom: 10,
  },
  iconText: {
    textAlign: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 80,
    paddingTop: 10,
  },
  tabBarLabel: {
    textAlign: 'center',
  },
  tabBarLabelFocused: {
    fontWeight: 'bold',
  },
  tabBarLabelUnfocused: {
    fontWeight: 'normal',
  },
  stackContentStyle: {
    backgroundColor: 'transparent',
  },
});
