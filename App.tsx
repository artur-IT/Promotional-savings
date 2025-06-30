import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button } from 'react-native';
import Home from './screens/Home/Home';
import AddSaving from './screens/AddSaving/AddSaving';
import Goal from './screens/Goal/Goal';

function HomeScreen() {
  return <Home />;
}

function AddSavingScreen() {
  return <AddSaving />;
}

function GoalScreen() {
  return <Goal />;
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
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
        headerRight: () => (
          <Button
            title="Info"
            onPress={() => Alert.alert('This is a button!')}
          />
        ),
      },
    },
    NewSaving: AddSavingScreen,
    Goal: GoalScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return <Navigation />;
}

export default App;
