import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import Home from './screens/Home/Home';
import AddSaving from './screens/AddSaving/AddSaving';
import Goal from './screens/Goal/Goal';
import HistoryGoals from './screens/HistoryGoals/HistoryGoals';
import HistorySavings from './screens/HistorySavings/HistorySavings';
import About from './components/About';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Hide header for all screens
        headerShown: false,
        // Configure tab bar icons
        tabBarIcon: ({ focused, size }) => {
          let icon: string;

          if (route.name === 'Home') {
            icon = '🏠';
          } else if (route.name === 'Goal') {
            icon = '🏆';
          } else if (route.name === 'AddSaving') {
            icon = '➕';
          } else if (route.name === 'HistoryGoals') {
            icon = '⏰';
          } else if (route.name === 'About') {
            icon = 'ℹ️';
          } else {
            icon = '❓';
          }

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: size + 16,
                height: size + 16,
                backgroundColor: 'transparent',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: size + 30,
                  height: size + 32,
                  paddingBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: focused ? size * 1.15 : size * 1.0,
                    textAlign: 'center',
                    transform: focused ? [{ scaleX: 1.1 }] : [{ scaleX: 1 }],
                  }}
                >
                  {icon}
                </Text>
              </View>
            </View>
          );
        },
        // Tab bar styling
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderTopColor: '#000',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#4CAF50' : '#757575',
              }}
            >
              Dom
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Goal"
        component={Goal}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#4CAF50' : '#757575',
              }}
            >
              Cel
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AddSaving"
        component={AddSaving}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#4CAF50' : '#757575',
              }}
            >
              Dodaj
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="HistoryGoals"
        component={HistoryGoals}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#4CAF50' : '#757575',
              }}
            >
              Historia
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#4CAF50' : '#757575',
              }}
            >
              O App
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="HistorySavings" component={HistorySavings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
