import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import AddSaving from './screens/AddSaving/AddSaving';
import Goal from './screens/Goal/Goal';
import HistorySavings from './screens/HistorySavings/HistorySavings';
import HistoryGoals from './screens/HistoryGoals/HistoryGoals';
import About from './components/About';

function HomeScreen() {
  return <Home />;
}

function AddSavingScreen() {
  return <AddSaving />;
}

function GoalScreen() {
  return <Goal />;
}

function HistoryScreen() {
  return <HistorySavings />;
}

function HistoryGoalsScreen() {
  return <HistoryGoals />;
}

function AboutScreen() {
  return <About />;
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Witaj!',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    NewSaving: AddSavingScreen,
    Goal: GoalScreen,
    HistorySavings: HistoryScreen,
    About: AboutScreen,
    HistoryGoals: HistoryGoalsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return <Navigation />;
}

export default App;
