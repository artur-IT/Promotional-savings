import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StatusBar, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { colors } from './constants/colors';
import Home from './screens/Home/Home';
import AddSaving from './screens/AddSaving/AddSaving';
import Goal from './screens/Goal/Goal';
import HistoryGoals from './screens/HistoryGoals/HistoryGoals';
import HistorySavings from './screens/HistorySavings/HistorySavings';
import About from './components/About';
import Top from './components/Top';
import useNavigationStore from './store/useNavigationStore';

// Create stack navigator
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

// Tab configuration
const tabs = [
  { key: 'home', title: 'Start', icon: '🌞', component: Home },
  { key: 'goal', title: 'Cel', icon: '🏆', component: Goal },
  { key: 'addSaving', title: 'Dodaj', icon: '💰', component: AddSaving },
  { key: 'historyGoals', title: 'Ukończone', icon: '🏁', component: HistoryGoals },
  { key: 'historySavings', title: 'Historia', icon: '📋', component: HistorySavings },
  { key: 'about', title: 'Info', icon: '❓', component: About },
];

// Create scene map for TabView
const renderScene = SceneMap({
  home: Home,
  goal: Goal,
  addSaving: AddSaving,
  historyGoals: HistoryGoals,
  historySavings: HistorySavings,
  about: About,
});

// Main Tab Navigator Component
function BottomTabNavigator() {
  const getResponsiveFontSize = useResponsiveFontSize();
  const { activeTabIndex, setActiveTabIndex } = useNavigationStore();
  const [routes] = useState(
    tabs.map(tab => ({ key: tab.key, title: tab.title }))
  );

  // Custom Tab Bar
  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabBarStyle}>
        {props.navigationState.routes.map((route: any, idx: number) => {
          const isFocused = activeTabIndex === idx;
          const tab = tabs[idx];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => setActiveTabIndex(idx)}
            // style={styles.tabItem}
            >
              {/* Tab Icon */}
              {/* <View style={[styles.iconOuter]}> */}
              <View style={[styles.iconInner]}>
                <Text style={[styles.iconText, { fontSize: 24 }]}>
                  {tab.icon}
                </Text>
              </View>
              {/* </View> */}

              {/* Tab Label */}
              <Text
                style={[
                  styles.tabBarLabel,
                  isFocused ? styles.tabBarLabelFocused : styles.tabBarLabelUnfocused,
                  {
                    fontSize: getResponsiveFontSize(12),
                    color: isFocused
                      ? colors.navigation.focused
                      : colors.navigation.unfocused,
                  },
                ]}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Top component - rendered once and stays in place with absolute position */}
      <View style={styles.topContainer}>
        <Top />
      </View>

      {/* TabView with all screens - with padding to avoid overlap with Top */}
      <View style={styles.contentContainer}>
        <TabView
          navigationState={{ index: activeTabIndex, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setActiveTabIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          tabBarPosition="bottom"
          swipeEnabled={true}
          animationEnabled={true}
          lazy={true}
          lazyPreloadDistance={1}
        />
      </View>
    </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 100, // Height of Top component to prevent overlap
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
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    paddingBottom: 5,
  },
  iconText: {
    textAlign: 'center',
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
