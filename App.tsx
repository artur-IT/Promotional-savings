import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StatusBar, Dimensions, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
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

// Screen names array - order matters for swipe navigation
const screenNames = ['Home', 'Goal', 'AddSaving', 'HistoryGoals', 'HistorySavings', 'About'];

// Component that wraps each screen with swipeable functionality
function SwipeableScreen({ children, screenIndex }: { children: React.ReactNode; screenIndex: number }) {
  const navigation = useNavigation();
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(screenIndex);

  // Handle page change from swipe
  const handlePageSelected = (e: any) => {
    const index = e.nativeEvent.position;
    setCurrentIndex(index);
    // Navigate to corresponding tab when swiped
    const targetRoute = screenNames[index];
    if (targetRoute) {
      (navigation as any).navigate(targetRoute);
    }
  };

  // Listen to navigation changes and sync PagerView
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.getState();
      if (state) {
        const tabState = state.routes[0]?.state;
        if (tabState && tabState.index !== undefined) {
          const index = tabState.index;
          if (index !== currentIndex && pagerRef.current) {
            setCurrentIndex(index);
            pagerRef.current.setPage(index);
          }
        }
      }
    });

    return unsubscribe;
  }, [navigation, currentIndex]);

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={screenIndex}
      onPageSelected={handlePageSelected}
    >
      <View key="0">
        <Home />
      </View>
      <View key="1">
        <Goal />
      </View>
      <View key="2">
        <AddSaving />
      </View>
      <View key="3">
        <HistoryGoals />
      </View>
      <View key="4">
        <HistorySavings />
      </View>
      <View key="5">
        <About />
      </View>
    </PagerView>
  );
}

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
        options={{
          tabBarLabel: createTabBarLabel('Dom', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={0}><Home /></SwipeableScreen>}
      </Tab.Screen>
      <Tab.Screen
        name="Goal"
        options={{
          tabBarLabel: createTabBarLabel('Cel', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={1}><Goal /></SwipeableScreen>}
      </Tab.Screen>
      <Tab.Screen
        name="AddSaving"
        options={{
          tabBarLabel: createTabBarLabel('Dodaj', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={2}><AddSaving /></SwipeableScreen>}
      </Tab.Screen>
      <Tab.Screen
        name="HistoryGoals"
        options={{
          tabBarLabel: createTabBarLabel('Osiągnięte', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={3}><HistoryGoals /></SwipeableScreen>}
      </Tab.Screen>
      <Tab.Screen
        name="HistorySavings"
        options={{
          tabBarLabel: createTabBarLabel('Historia', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={4}><HistorySavings /></SwipeableScreen>}
      </Tab.Screen>
      <Tab.Screen
        name="About"
        options={{
          tabBarLabel: createTabBarLabel('Info', getResponsiveFontSize),
        }}
      >
        {() => <SwipeableScreen screenIndex={5}><About /></SwipeableScreen>}
      </Tab.Screen>
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
  pagerView: {
    flex: 1,
  },
});
