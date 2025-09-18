import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StatusBar } from 'react-native';
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
          } else if (route.name === 'HistorySavings') {
            icon = '📊';
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
                  width: 'auto',
                  // backgroundColor: 'red',
                  height: size + 32,
                  paddingBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: size,
                    textAlign: 'center',
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
          backgroundColor: colors.background.main,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 80,
          paddingBottom: 10,
          paddingTop: 15,
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
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
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
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
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
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
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
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
              }}
            >
              Osiągnięte
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="HistorySavings"
        component={HistorySavings}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
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
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused
                  ? colors.navigation.focused
                  : colors.navigation.unfocused,
              }}
            >
              Info
            </Text>
          ),
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
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
