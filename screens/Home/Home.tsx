import { Image, StyleSheet, Text, View } from 'react-native';
import YearSaving from '../../components/Home/YearSaving';
import MonthSaving from '../../components/Home/MonthSaving';
import LastAdd from '../../components/Home/LastAdd';
import GoalProgress from '../../components/Goal/GoalProgress';

const TopImage = require('../../assets/images/top_bg.gif');
const PlaceholderImage = require('../../assets/images/money-bag_big.png');

export default function HomeWithGoal() {
  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
      <Image source={PlaceholderImage} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Promocyjne </Text>
        <Text style={styles.title}>oszczędności</Text>
      </View>

      <View style={styles.year}>
        <YearSaving />
      </View>

      <View style={styles.circles}>
        <MonthSaving />
        <LastAdd />
      </View>

      <GoalProgress variant="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  titleContainer: {
    marginTop: 30,
    marginLeft: -200,
    display: 'flex',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: '#0084CE',
  },

  topImage: {
    position: 'absolute',
    top: -170,
    right: -10,
    width: 400,
    height: 400,
  },
  image: {
    position: 'absolute',
    top: 190,
    width: 370,
    height: 370,
    opacity: 0.3,
  },
  year: {
    position: 'relative',
    left: -100,
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 40,
  },
});
