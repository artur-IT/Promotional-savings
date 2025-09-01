import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import YearSaving from '../../components/Home/YearSaving';
import MonthSaving from '../../components/Home/MonthSaving';
import LastAdd from '../../components/Home/LastAdd';
import GoalProgress from '../../components/Goal/GoalProgress';

const TopImage = require('../../assets/images/top_bg.gif');
const PlaceholderImage = require('../../assets/images/money-bag_big.png');

export default function HomeWithGoal() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: 50,
  },
  titleContainer: {
    marginTop: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
    display: 'flex',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: colors.text.title,
  },

  topImage: {
    position: 'absolute',
    top: -170,
    right: -10,
    width: '100%',
    maxWidth: 400,
    height: 400,
  },
  image: {
    position: 'absolute',
    top: 190,
    width: '90%',
    maxWidth: 370,
    height: 370,
    opacity: 0.3,
  },
  year: {
    alignSelf: 'flex-start',
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 40,
  },
});
